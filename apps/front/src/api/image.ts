import { ImageService, Model } from '@music/types';

import { axiosInstance } from './axiosInstance';

export const uploadImage = async ({
  file,
  filename,
  path,
}: ImageService.UplaodImageRequest): Promise<Model.ImageInfo> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('filename', filename);
  formData.append('path', path);

  return axiosInstance
    .post<ImageService.UploadImageResponse>('/api/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(() => {
      return {
        name: file.name,
        url: URL.createObjectURL(file),
        created: new Date(),
      };
    });
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     console.log('upload image', file.name);
  //     resolve({
  //       name: file.name,
  //       url: URL.createObjectURL(file),
  //       created: new Date(),
  //     });
  //   }, 1000);
  // });
};
