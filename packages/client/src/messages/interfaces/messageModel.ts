import { BaseModel } from "../../shared/models/baseModel";
import { User } from "../../user/models/userModel";

export interface MessageModel extends BaseModel {
  content: string;
  user: User;
}
