import mongoose from 'mongoose';
import { prop, getModelForClass, arrayProp, Ref } from '@typegoose/typegoose';
import { User } from './UserModel';
import { Post } from './PostModel';

export class Profile {
  _id?: mongoose.Types.ObjectId;
  @prop({ ref: User })
  public user?: Ref<User>;
  @prop()
  public bio?: string;
  @arrayProp({ items: String })
  skills?: string[];
  @arrayProp({ items: String })
  address?: string[];
  @prop()
  public phone?: string;
  @prop({ ref: Post })
  public posts?: Ref<Post>;
  @prop()
  public active?: Date;
}

export const ProfileModel = getModelForClass(Profile);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (conn: mongoose.Connection) => conn.model('Profile', ProfileModel.schema);
