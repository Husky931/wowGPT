import Cookies from 'js-cookie';

type Data = {
  jwt: string;
  user: any;
};

export const setToken = (data: Data) => {
  if (typeof window === 'undefined') return;

  // if (data.user.confirmed === false) {
  //   Cookies.set('email', data.user.email);
  //   return window.location.assign(
  //     `${process.env.NEXT_PUBLIC_LINGO_HOMEPAGE}/verify-email`,
  //   );
  // }

  Cookies.set('jwt', data.jwt);
  Cookies.set('username', data.user.username);
  Cookies.set('id', data.user.id.toString());
  Cookies.set('confirmed', data.user.confirmed.toString());

  if (Cookies.get('username')) {
    window.location.reload();
  }
};

export const unsetToken = () => {
  Cookies.remove('id');
  Cookies.remove('username');
  Cookies.remove('jwt');
  Cookies.remove('confirmed');
  // Cookies.remove('email');
  window.location.reload();
};

export const getTokenFromLocalCookie = () => {
  return Cookies.get('jwt');
};
