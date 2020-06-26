import mongoose from 'mongoose';
import { prop, getModelForClass, arrayProp, Ref } from '@typegoose/typegoose';
import { User } from './UserModel';
import { Post } from './PostModel';

export type Reward =
  | 'angel'
  | 'brave'
  | 'calming'
  | 'chat'
  | 'funny'
  | 'helpful'
  | 'honest'
  | 'smart'
  | 'survivor';

export class Profile {
  _id?: mongoose.Types.ObjectId;
  @prop({ ref: User })
  public user?: Ref<User>;
  @prop()
  public bio?: string;
  @prop()
  public location?: string;
  @prop()
  public phone?: string;
  @prop({ ref: Post })
  public posts?: Ref<Post>;
  @prop()
  public active?: Date;
  // rewards
  @arrayProp({ ref: User })
  public angelLikes?: Ref<User>[];
  @arrayProp({ ref: User })
  public angelNominates?: Ref<User>[];
  @arrayProp({ ref: User })
  public braveLikes?: Ref<User>[];
  @arrayProp({ ref: User })
  public braveNominates?: Ref<User>[];
  @arrayProp({ ref: User })
  public calmingLikes?: Ref<User>[];
  @arrayProp({ ref: User })
  public calmingNominates?: Ref<User>[];
  @arrayProp({ ref: User })
  public chatLikes?: Ref<User>[];
  @arrayProp({ ref: User })
  public chatNominates?: Ref<User>[];
  @arrayProp({ ref: User })
  public funnyLikes?: Ref<User>[];
  @arrayProp({ ref: User })
  public funnyNominates?: Ref<User>[];
  @arrayProp({ ref: User })
  public helpfulLikes?: Ref<User>[];
  @arrayProp({ ref: User })
  public helpfulNominates?: Ref<User>[];
  @arrayProp({ ref: User })
  public honestLikes?: Ref<User>[];
  @arrayProp({ ref: User })
  public honestNominates?: Ref<User>[];
  @arrayProp({ ref: User })
  public smartLikes?: Ref<User>[];
  @arrayProp({ ref: User })
  public smartNominates?: Ref<User>[];
  @arrayProp({ ref: User })
  public survivorLikes?: Ref<User>[];
  @arrayProp({ ref: User })
  public survivorNominates?: Ref<User>[];
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
