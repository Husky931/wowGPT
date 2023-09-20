import { createContext, useContext, useEffect, useState } from 'react';

import {
  getTokenFromLocalCookie,
  unsetToken,
} from '../pages/api/auth/js-cookie';

type AuthContextValue = {
  userData: any | undefined;
  loading: boolean;
};

const Context = createContext<AuthContextValue | undefined>(undefined);

export function Provider({ children }: any) {
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      const user = !!getTokenFromLocalCookie();
      if (user) {
        const token = getTokenFromLocalCookie();
        try {
          const res = await fetch(
            `https://luxifyverse.com/strapi/api/users/me/`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            },
          );

          const data = await res.json();

          if (data.error) {
            return unsetToken();
          }

          setUserData(data);
        } catch (error) {
          unsetToken();
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    getUserData();
  }, []);

  return (
    <Context.Provider value={{ userData, loading }}>
      {children}
    </Context.Provider>
  );
}

export const useUser = () => {
  const context = useContext(Context);
  // if (context === undefined) {
  //   throw new Error('useUser must be used within an AuthContext.Provider');
  // }
  return context;
};
