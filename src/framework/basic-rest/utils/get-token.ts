import Cookies from 'js-cookie';

export function getToken() {
  if (typeof window === undefined) {
    return null;
  }
  return Cookies.get('auth_token');
}
