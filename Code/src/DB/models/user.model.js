import mongoose from "mongoose";
import { GenderEnum, ProviderEnum, RoleEnum } from "../../common/enum/index.js";
import { type } from "os";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is mandatory"],
      minLength: 2,
      maxLength: 25,
    },
    middleName: {
      type: String,
      required: [
        function () {
          return this.provider == ProviderEnum.system;
        },
        "Middle name is required for system users",
      ],
      minLength: 2,
      maxLength: 25,
    },
    lastName: {
      type: String,
      required: [true, "Last name is mandatory"],
      minLength: 2,
      maxLength: 25,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    DOB: Date,
    password: {
      type: String,
      required: [
        function () {
          return this.provider == ProviderEnum.system;
        },
        "Password is required for system accounts",
      ],
    },
    phone: String,
    gender: {
      type: Number,
      enum: Object.values(GenderEnum),
      default: GenderEnum.male,
    },
    provider: {
      type: Number,
      enum: Object.values(ProviderEnum),
      default: ProviderEnum.system,
    },
    role: {
      type: Number,
      enum: Object.values(RoleEnum),
      default: RoleEnum.User,
    },
    profilePicture: {
      public_id : String,
      secure_url : String,
    },
    profileCover:{
      public_id : String,
      secure_url : String,
    },
    changeCredentialsTime:Date,
    confirmEmail: {
      type : Date,
      default : null
    },
    isTwoFactorEnabled : {
      type : Boolean,
      default : false
    }
  },
  {
    timestamps: true,
    strict: true,
    strictQuery: true,
    toJSON: true,
    toObject: true,
  },
);
UserSchema.virtual("userName")
  .set(function (value) {
    const [firstName, middleName, lastName] = value?.split(" ") || [];
    this.set({ firstName, middleName, lastName });
  })
  .get(function () {
    return `${this.firstName} ${this.middleName} ${this.lastName}`;
  });
UserSchema.index({createdAt : 1})
export const userModel =
  mongoose.models.User || mongoose.model("User", UserSchema);
