import mongoose from 'mongoose';
import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Post } from './PostModel';
import { User } from './UserModel';

export type AwardType =
  | 'angel'
  | 'brave'
  | 'calming'
  | 'chatty'
  | 'funny'
  | 'helpful'
  | 'honest'
  | 'smart'
  | 'survivor';

export class Award {
  _id?: mongoose.Types.ObjectId;

  @prop()
  public award?: AwardType;

  @prop()
  public nominate?: boolean;

  @prop({ ref: Post })
  public post?: Ref<Post>;

  @prop({ ref: User })
  public owner?: Ref<User>;

  @prop({ ref: User })
  public subscriber?: Ref<User>;
}

export const AwardModel = getModelForClass(Award);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (conn: mongoose.Connection) => conn.model('Award', AwardModel.schema);
