import mongoose from 'mongoose';
import { prop, getModelForClass } from '@typegoose/typegoose';
import { User } from './UserModel';
import { IShot } from './ShotModel';
import { ILike } from './LikeModel';
import { IShare } from './ShareModel';
import { IBookmark } from './BookmarkModel';

/**
 * @description holds post model
 */

/**
 * Post interface
 */
export class Post {
  @prop()
  public id?: string;
  public user?: User | string;
  public transform?: () => Post;
  // public shots?: {
  //   list: Array<string>;
  //   count: number;
  // };
  // public like?: ILike | string;
  // public share?: IShare | string;
  // public bookmark?: IBookmark | string;
}

const PostModel = getModelForClass(Post);

// post collection name
const collectionName = 'post';

/**
 * transforms post object
 * changes _id to id
 */
PostModel.schema.methods.transform = function (): any {
  const obj = this.toObject();

  const id = obj._id;
  delete obj._id;
  obj.id = id;

  return obj;
};

/**
 * creates post model
 * @param conn database connection
 * @returns post model
 */
export default (conn: mongoose.Connection) => conn.model(collectionName, PostModel.schema);
