import { ImageService } from '@music/types';

import { axiosInstance } from './axiosInstance';

export const uploadImage = async ({ file }: ImageService.UplaodImageRequest) => {
  const formData = new FormData();
  formData.append('file', file);

  return axiosInstance
    .post<ImageService.UploadImageResponse>('/api/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => ({ ...res.data.data, url: `/api/image/${res.data.data.id}` }));
  // .then(() => {
  //   return {
  //     name: file.name,
  //     url: URL.createObjectURL(file),
  //     created: new Date(),
  //   };
  // });
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
