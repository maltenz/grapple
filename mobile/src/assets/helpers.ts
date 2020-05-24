import bson, { EJSON } from 'bson';

/**
 * Created bson id string
 * @returns {id string}
 */
export const CreateId = (): string => {
  let id = new bson.ObjectId();
  const formatId = JSON.parse(EJSON.stringify(id));
  id = formatId.$oid;
  return `${id}`;
};
