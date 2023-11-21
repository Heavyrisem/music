import axios from 'axios';

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
  const { accessToken } = parseCookies();
  if (typeof accessToken === 'string') {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
