import mongoose from 'mongoose';
import { IUser } from './UserModel';
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
export interface IPost extends mongoose.Document {
  id: string;
  user: IUser;
  shots: IShot;
  like: ILike;
  share: IShare;
  bookmark: IBookmark;
  transform: () => IPost;
}

/**
 * post schema
 */
const schema: mongoose.SchemaDefinition = {
  user: {
    type: mongoose.SchemaTypes.String,
    ref: 'User',
  },
  shots: {
    type: mongoose.SchemaTypes.String,
    list: [
      {
        type: mongoose.SchemaTypes.String,
        ref: 'Shot',
      },
    ],
  },
  like: {
    type: mongoose.SchemaTypes.String,
    ref: 'Like',
  },
  share: {
    type: mongoose.SchemaTypes.String,
    ref: 'Share',
  },
  bookmark: {
    type: mongoose.SchemaTypes.String,
    ref: 'Bookmark',
  },
};

// post collection name
const collectionName = 'post';

const postSchema: mongoose.Schema = new mongoose.Schema(schema);

/**
 * transforms post object
 * changes _id to id
 */
postSchema.methods.transform = function (): any {
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
const PostModel = (conn: mongoose.Connection): mongoose.Model<IPost> =>
  conn.model(collectionName, postSchema);

export default PostModel;
