import BookmarkModel, { IBookmark } from '../models/BookmarkModel';
import { ApolloError } from 'apollo-server';
import { Context } from '../context';
import loginRequired from '../helper/loginRequired';

/**
 * creates bookmark
 * @param context
 * @param args bookmark
 * @returns {Bookmark} created bookmark
 */
export const createBookmark = async (
  { dbConn, loggedIn }: Context,
  args: IBookmark
): Promise<any> => {
  let createdBookmark: IBookmark;

  loginRequired(loggedIn);

  const { id, ...rest } = args;

  try {
    createdBookmark = (await BookmarkModel(dbConn).create({ ...rest, metric: id })).transform();
  } catch (error) {
    console.error('> createBookmark error: ', error);
    throw new ApolloError('Error saving bookmark');
  }

  return createdBookmark;
};

/**
 * gets bookmark by id
 * @param context
 * @param id bookmark id
 * @returns {Bookmark | null} bookmark or null
 */
export const getBookmark = async ({ dbConn, loggedIn }, id: string): Promise<any> => {
  let bookmark: IBookmark | null;

  loginRequired(loggedIn);

  try {
    bookmark = await BookmarkModel(dbConn).findById(id);

    if (bookmark !== null) {
      bookmark = bookmark.transform();
    }
  } catch (error) {
    console.error('> getBookmark error: ', error);
    throw new ApolloError('Error retrieving bookmark with id: ' + id);
  }

  return bookmark;
};

/**
 * deletes bookmark
 * @param context
 * @param id bookmark id
 * @returns {Bookmark | null} deleted bookmark or null
 */
export const deleteBookmark = async ({ dbConn, loggedIn }, id: string): Promise<any> => {
  let deletedBookmark: IBookmark | null;

  loginRequired(loggedIn);

  try {
    deletedBookmark = await BookmarkModel(dbConn).findByIdAndRemove(id);

    if (deletedBookmark !== null) {
      deletedBookmark = deletedBookmark.transform();
    }
  } catch (error) {
    console.error('> deleteBookmark error: ', error);
    throw new ApolloError('Error deleting bookmark with id: ' + id);
  }

  return deletedBookmark;
};
