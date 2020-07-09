import mongoose from 'mongoose';
import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from './UserModel';
import { Post } from './PostModel';

export class Profile {
  _id?: mongoose.Types.ObjectId;

  @prop({ ref: User })
  public user?: Ref<User>;

  @prop({ ref: Post })
  public posts?: Ref<Post>;

  @prop()
  public bio?: string;

  @prop()
  public location?: string;

  @prop()
  public phone?: string;

  @prop()
  public active?: Date;
}
export interface UpdateProfile {
  id: mongoose.Types.ObjectId;
  bio: string;
  phone: string;
  active: Date;
}

export const ProfileModel = getModelForClass(Profile);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (conn: mongoose.Connection) => conn.model('Profile', ProfileModel.schema);
