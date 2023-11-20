import { ImageService, Model } from '@music/types';

export const uploadImage = async ({
  file,
}: ImageService.UplaodImageRequest): Promise<Model.ImageInfo> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('upload image', file.name);
      resolve({
        name: file.name,
        url: URL.createObjectURL(file),
        created: new Date(),
      });
    }, 1000);
  });
};
