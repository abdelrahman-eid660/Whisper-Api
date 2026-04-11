import { APPLICATION_NAME } from "../../../config/config.service.js";
import { RoleEnum } from "../../common/enum/user.enum.js";
import { deleteAttachments, uploadFiles } from "../../common/services/index.js";
import { NotFoundException } from "../../common/utils/index.js";
import { createOne, deleteOne, find, findOne } from "../../DB/dataBase.service.js";
import { userModel, MessageModel } from "../../DB/models/index.js";

export const sendMessage = async (files = [],{ content },receiverId,user,) => {
  const receiver = await findOne({
    model: userModel,
    filter: { _id: receiverId, confirmEmail: { $exists: true } },
  });
  if (!receiver) {
    throw NotFoundException({ message: "No matching account" });
  }
  const baseFolder = `${APPLICATION_NAME}/messages/${receiverId}`;
  const attachments = await uploadFiles({files, folder: `${baseFolder}/attachments`,});
  const message = await createOne({
    model: MessageModel,
    data: {
      content,
      attachments,
      receiverId,
      senderId: user ? user._id : undefined,
    },
  });
  return message;
};
export const getMessage = async (messageId , user) => {
  const select = user.role === RoleEnum.Admin ? "" : "-senderId";
  const message = await findOne({
    model: MessageModel,
    filter: {
    _id: messageId,
    $or: [
      {senderId : user._id},
      {receiverId : user._id}
    ] 
  },
   select
  });
  if (!message) {
    throw NotFoundException({ message: "Invalid message or not authorized action" });
  }
  return message;
};
export const getAllMessage = async (user) => {
  const select = user.role === RoleEnum.Admin ? "" : "-senderId";
  const message = await find({
    model: MessageModel,
    filter: {
    $or: [
      {senderId : user._id},
      {receiverId : user._id}
    ] 
  },
   select
  });
  if (!message) {
    throw NotFoundException({ message: "Invalid message or not authorized action" });
  }
  return message;
};
export const deleteMessage = async (messageId , user) => {  
  const message = await findOne({
    model: MessageModel,
    filter: {
    _id: messageId,
    receiverId : user._id
  }});
  
  if (!message) {
    throw NotFoundException({ message: "Invalid message or not authorized action" });
  }
  if (message?.attachments?.length) {
    await deleteAttachments({attachments : message.attachments , receiverId : user._id})
  }
  await deleteOne({model : MessageModel , 
    filter: {
    _id: messageId,
    receiverId : user._id
  }})
  return "Done";
};
