import { APPLICATION_NAME, REFREASH_EXPIRS_IN } from "../../../config/config.service.js";
import { OTPActionsEnum, OTPSubjectEnum, OTPTitleEnum, OTPTypeEnum , LogoutEnum , ProviderEnum} from "../../common/enum/index.js";
import { deleteFile, deleteImage, deleteKey, get, incr, keys, otpKey, set, uploadFile } from "../../common/services/index.js";
import {
  checkOtpBlcok,
  checkOTPRequest,
  compareHash,
  ConflictException,
  createLoginCredentials,
  decrypt,
  emailEmitter,
  generateOTP,
  generatHash,
  NotFoundException,
} from "../../common/utils/index.js";
import { createOne, deleteMany, deleteOne, findOne } from "../../DB/dataBase.service.js";
import { TokenModel  , userModel } from "../../DB/models/index.js";
const generateOTPV2StepVerification =  async(email)=>{
  const blockKey = await checkOtpBlcok({type : OTPTypeEnum.TwoStepVerification , key : email , action : OTPActionsEnum.BlockTwoStepVerification})
  const {maxTrialCountKey , checkMaxOtpRequest} = await checkOTPRequest({type : OTPTypeEnum.TwoStepVerification , key : email , account : OTPActionsEnum.Request , blockKey})
  const code = await generateOTP();
  await set({ key: otpKey({type : OTPTypeEnum.TwoStepVerification , key : email}), value: await generatHash(code), ttl: 120 });
  checkMaxOtpRequest > 0 ? await incr({ key: maxTrialCountKey }) : await set({ key: maxTrialCountKey, value: 1, ttl: 300 });
  emailEmitter.emit("SEND OTP" , {to : email , code , subject: OTPSubjectEnum.TwoStepVerification, title: OTPTitleEnum.TwoStepVerification})
  return;
  }
export const profile = async (user) => {
  return user;
};
export const enable2Step_Verification = async (user,inputs) => {  
  const {isTwoFactorEnabled} = inputs
  if (!isTwoFactorEnabled) {
    throw NotFoundException({message : "Invalid 2 step verification"})
  }
  return  await generateOTPV2StepVerification(user.email)
  
};
export const confirm2Step_Verification = async ({ email, otp }) => {
    const acconut = await findOne({
      model: userModel,
      filter: {
        email,
        confirmEmail: { $exists: true },
        provider: ProviderEnum.system,
        TwoStepVerification : {$exists : false}
      },
    });
    if (!acconut) {
      throw NotFoundException({ message: "Fail to find matching account" });
    }
    const hashedOTP = await get({ key: otpKey({type : OTPTypeEnum.TwoStepVerification ,key : email}) });
  
    if (!hashedOTP) {
      throw NotFoundException({ message: "Expired otp" });
    }
    if (!(await compareHash(otp, hashedOTP))) {
      throw ConflictException({ message: "Invalid otp" });
    }
    acconut.isTwoFactorEnabled = true
    await acconut.save()
    await deleteKey(await keys(otpKey({type : OTPTypeEnum.TwoStepVerification ,key : email})))
    return acconut
  
};
export const shareProfile = async ({ id }) => {
  const user = await findOne({
    model: userModel,
    filter: { _id: id },
    select: "firstName middleName lastName email phone picture",
  });
  if (user) {
    user.phone = await decrypt(user.phone);
    return user;
  } else {
    throw NotFoundException({
      message: "هذا الحساب غير مسجل لدينا برجاء التاكد من رابط الحساب",
    });
  }
};
export const profilePicture = async (file, user) => {
  const baseFolder = `${APPLICATION_NAME}/users/${user._id}`
  if (user.profilePicture?.public_id) {
    await deleteFile(user.profilePicture.public_id)
  }
  const {public_id , secure_url} = await uploadFile({filePath : file.path , folder : `${baseFolder}/profile`})
  user.profilePicture = {public_id , secure_url};
  await user.save();
  return "Done";
};
export const profileCover = async (file, user) => {
  const baseFolder = `${APPLICATION_NAME}/users/${user._id}`
  if (user.profileCover?.public_id) {
    await deleteFile(user.profileCover.public_id)
  }
  const {public_id , secure_url} = await uploadFile({filePath : file.path , folder : `${baseFolder}/cover`})
  user.profileCover = {public_id , secure_url};
  await user.save();
  return "Done";
};
export const updatePassword = async (inputs , user) => {
  const {oldPassword , newPassword } = inputs
  if (!await compareHash(oldPassword , user.password)) {
    return NotFoundException({ message: "Invalid Password",});
  }
  user.password = await generatHash(newPassword)
  await user.save()
  return user
  
};
export const logout = async ({ flag }, user, decode) => {
  let status = 200
  switch (flag) {
    case LogoutEnum.All:
      user.changeCredentialsTime = new Date(Date.now());
      await user.save();
      await deleteMany({model : TokenModel , filter : {userId : user._id }})
      break;
    default:
      const rovokToken = await createOne({
        model: TokenModel,
        data: {
          userId: decode.sub,
          jwtid: decode.jti,
          expiresIn: new Date((decode.iat + REFREASH_EXPIRS_IN) * 1000),
        },
      });
      status = 201
      break;
    }
    return status;
};
export const rotateToken = async (user, issure) => {
  return await createLoginCredentials(user, issure);
};
export const deleteAccount = async(user)=>{
  await deleteImage(user)
  await deleteOne({model : userModel , filter : {_id : user._id}})
  return "Done"
}
