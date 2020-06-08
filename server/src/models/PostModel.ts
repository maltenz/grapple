import mongoose from 'mongoose';
import { prop, getModelForClass, Ref, arrayProp } from '@typegoose/typegoose';
import { User } from './UserModel';

export class Shot {
  @prop()
  public title?: string;
  @prop()
  public content?: string;
  @prop()
  public image?: string;
}

export class Post {
  _id?: mongoose.Types.ObjectId;
  @prop({ ref: User })
  public user?: Ref<User>;
  @arrayProp({ items: Shot })
  shots?: Shot[];
  @arrayProp({ ref: 'User' })
  public likes?: Ref<User>[];
  @prop()
  public liked?: boolean;
  @arrayProp({ ref: 'User' })
  public bookmarks?: Ref<User>[];
  @prop()
  public bookmarked?: boolean;
}

const PostModel = getModelForClass(Post);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (conn: mongoose.Connection) => conn.model('Post', PostModel.schema);
