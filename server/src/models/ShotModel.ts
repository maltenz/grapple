import mongoose from 'mongoose';
import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from './UserModel';
import { Post } from './PostModel';

/**
 * Shot interface constructor
 */
export class Shot {
  _id?: mongoose.Types.ObjectId;
  @prop({ ref: User })
  public user?: Ref<User>;
  @prop()
  public title?: string;
  @prop()
  public postId?: string;
  @prop()
  public content?: string;
  @prop()
  public image?: string;
  @prop()
  public order?: number;
}

const ShotModel = getModelForClass(Shot);

export default (conn: mongoose.Connection) => conn.model('Shot', ShotModel.schema);
