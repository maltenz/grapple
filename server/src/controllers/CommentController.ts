import { ApolloError } from 'apollo-server';
import { mongoose } from '@typegoose/typegoose';
import { Context } from '../context';
import loginRequired from '../helper/loginRequired';
import CommentModel, { Comment } from '../models/CommentModel';
import { CommentInput } from '../generated/graphql';

/**
 * @param context
 * @returns {Comment}
 */

export const createComment = async (
  { dbConn, loggedIn, user }: Context,
  args: CommentInput
): Promise<Comment> => {
  let ERR_MESSAGE;
  loginRequired(loggedIn);
  const { text, id } = args;

  let comment;

  try {
    comment = (await CommentModel(dbConn).create({
      text,
      user: user?._id,
      post: id,
    })) as Comment;

    if (comment === null) {
      ERR_MESSAGE = 'Unable to save comment';
      throw new Error(ERR_MESSAGE);
    }

    return comment;
  } catch (error) {
    throw new ApolloError(error);
  }
};

/**
 * @param context
 * @returns {Comment}
 */
export const updateComment = async (
  { dbConn, loggedIn }: Context,
  args: CommentInput
): Promise<Comment> => {
  let ERR_MESSAGE;
  loginRequired(loggedIn);
  const { id, text } = args;

  let comment;

  try {
    comment = (await CommentModel(dbConn).findByIdAndUpdate(
      id,
      {
        $set: { text },
      },
      { new: true }
    )) as Comment;

    if (comment === null) {
      ERR_MESSAGE = 'Unable to update comment';
      throw new Error(ERR_MESSAGE);
    }

    return comment;
  } catch (error) {
    throw new ApolloError(error);
  }
};

/**
 * @param context
 * @returns {Comment}
 */
interface DeleteCommentArgs {
  id: mongoose.Types.ObjectId;
}

export const deleteComment = async (
  { dbConn, loggedIn }: Context,
  args: DeleteCommentArgs
): Promise<Comment> => {
  let ERR_MESSAGE;
  loginRequired(loggedIn);
  const { id } = args;

  let comment;

  try {
    comment = (await CommentModel(dbConn).findByIdAndRemove(id)) as Comment;

    if (comment === null) {
      ERR_MESSAGE = 'Unable to delete comment';
      throw new Error(ERR_MESSAGE);
    }

    return comment;
  } catch (error) {
    throw new ApolloError(error);
  }
};

/**
 * @param context
 * @returns {Comment[]}
 */
interface GetCommentsArgs {
  id: mongoose.Types.ObjectId;
}

export const getComments = async (
  { dbConn, loggedIn }: Context,
  args: GetCommentsArgs
): Promise<Comment[]> => {
  let ERR_MESSAGE;
  const { id } = args;
  let list;

  loginRequired(loggedIn);

  try {
    list = (await CommentModel(dbConn).find({ post: id })) as Comment;

    if (list !== null && list.length > 0) {
      list = list.map((comment) => comment);
    }

    if (list === null) {
      ERR_MESSAGE = 'No comments found';
      throw new ApolloError(ERR_MESSAGE);
    }
  } catch (error) {
    throw new ApolloError(error);
  }

  return list;
};
