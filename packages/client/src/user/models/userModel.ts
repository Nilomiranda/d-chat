import {BaseModel} from "../../shared/models/baseModel";

export interface User extends BaseModel {
  name: string
  email: string
  password: string
}
