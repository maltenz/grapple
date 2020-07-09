import mongoose from 'mongoose';
import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
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
  @prop({ type: Shot })
  shots?: Shot[];
  @prop({ ref: 'User' })
  public likes?: Ref<User>[];
  @prop()
  public liked?: boolean;
  @prop({ ref: 'User' })
  public bookmarks?: Ref<User>[];
  @prop()
  public bookmarked?: boolean;
}

const PostModel = getModelForClass(Post);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (conn: mongoose.Connection) => conn.model('Post', PostModel.schema);
