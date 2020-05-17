import mongoose from 'mongoose';
import { prop, getModelForClass } from '@typegoose/typegoose';
import { Post } from './PostModel';

/**
 * User interface constructor
 */
export class User {
  @prop()
  public id?: string;
  @prop()
  public name?: string;
  @prop()
  public password?: string;
  @prop()
  public email?: string;
  @prop()
  public posts?: Array<Post>;
  public transform?: () => User;
}

const UserModel = getModelForClass(User);

const collectionName = 'user';

/**
 * transforms user object
 * changes _id to id
 */
UserModel.schema.methods.transform = function (): any {
  const obj = this.toObject();

  const id = obj._id;
  delete obj._id;
  obj.id = id;

  return obj;
};

export default (conn: mongoose.Connection) => conn.model(collectionName, UserModel.schema);
