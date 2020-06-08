import mongoose from 'mongoose';
import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from './UserModel';
import { Post } from './PostModel';

export class Comment {
  _id?: mongoose.Types.ObjectId;
  @prop()
  public text?: string;
  @prop({ ref: Post })
  public post?: Ref<Post>;
  @prop({ ref: User })
  public user?: Ref<User>;
}

export const CommentModel = getModelForClass(Comment);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (conn: mongoose.Connection) => conn.model('Comment', CommentModel.schema);
