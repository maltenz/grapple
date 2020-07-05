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

export interface UploadImageType {
  image: string;
  onUpload?: (value: boolean) => void;
  onComplete: (res: string) => void;
  type: 'postShots' | 'profile';
}

export const UploadImage = async ({
  type = 'postShots',
  image,
  onUpload,
  onComplete,
}: UploadImageType): Promise<void> => {
  const data = new FormData();
  data.append('file', `data:image/jpeg;base64,${image}` as string);
  data.append('upload_preset', type);
  data.append('cloud_name', process.env.CLOUDINARY_NAME as string);
  data.append('api_key', process.env.CLOUDINARY_KEY as string);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://api.cloudinary.com/v1_1/cloud_name/image/upload', true);

  if (onUpload) {
    onUpload(true);
  }

  try {
    xhr.onreadystatechange = (): void => {
      if (xhr.readyState === 4) {
        const respose = JSON.parse(xhr.response);
        onComplete(respose.url);

        if (onUpload) {
          onUpload(false);
        }
      }
    };
  } catch (err) {
    throw new Error(err);
  }
  xhr.send(data);
};
