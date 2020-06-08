import { ApolloError } from 'apollo-server';
import loginRequired from '../helper/loginRequired';
import { Context } from '../context';
import CommentModel, { Comment } from '../models/CommentModel';

/**
 * @param context
 * @returns {Comment}
 */
export const createComment = async ({ dbConn, loggedIn }: Context, args): Promise<Comment> => {
  let ERR_MESSAGE;
  loginRequired(loggedIn);
  const { text } = args;

  let comment;

  try {
    comment = (await CommentModel(dbConn).create({
      text,
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
export const updateComment = async ({ dbConn, loggedIn }: Context, args): Promise<Comment> => {
  let ERR_MESSAGE;
  loginRequired(loggedIn);
  const { id, text } = args;

  let comment;

  try {
    comment = (await CommentModel(dbConn).findByIdAndUpdate(id, {
      $set: { text },
    })) as Comment;

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
export const deleteComment = async ({ dbConn, loggedIn }: Context, args): Promise<Comment> => {
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
export const getCommemts = async ({ dbConn, loggedIn }: Context, args): Promise<Comment[]> => {
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
