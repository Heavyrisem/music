import axios, { AxiosError } from 'axios';

import { refetchToken } from './auth';

export const axiosInstance = axios.create();

function parseCookies() {
  const cookieString: string = document.cookie;
  const cookies: Record<string, string> = {};

  if (cookieString === '') {
    return cookies;
  }

  const cookieArray: string[] = cookieString.split(';');

  for (const cookie of cookieArray) {
    const [name, value] = cookie.trim().split('=');
    cookies[name] = value;
  }

  return cookies;
}

axiosInstance.interceptors.request.use((config) => {
  const { access_token } = parseCookies();
  if (typeof access_token === 'string') {
    config.headers.Authorization = `Bearer ${access_token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err instanceof AxiosError) {
      console.log(err.response?.status, err.config?.url);
      if (err?.response?.status === 401 && err.config?.url !== '/api/auth/refresh') {
        await refetchToken().catch((e) => {
          console.log('E', e);
          throw err;
        });

        if (err.config) return axiosInstance.request(err.config);
        throw err;
      }
    }

    throw err;
  },
);
