import mongoose from 'mongoose';
import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Post } from './PostModel';
import { User } from './UserModel';

export type RewardType =
  | 'angel'
  | 'brave'
  | 'calming'
  | 'chat'
  | 'funny'
  | 'helpful'
  | 'honest'
  | 'smart'
  | 'survivor';

export class Reward {
  _id?: mongoose.Types.ObjectId;
  @prop()
  public reward?: RewardType;
  @prop()
  public nominate?: boolean;
  @prop({ ref: Post })
  public post?: Ref<Post>;
  @prop({ ref: User })
  public user?: Ref<User>;
}

export const RewardModel = getModelForClass(Reward);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (conn: mongoose.Connection) => conn.model('Reward', RewardModel.schema);
