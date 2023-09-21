import { useCallback } from 'react';

import { useFetch } from '@/hooks/useFetch';

import Cookies from 'js-cookie';

export interface GetModelsRequestProps {
  key: string;
}

const useApiService = () => {
  const fetchService = useFetch();

  const getModels = useCallback(
    (params: GetModelsRequestProps, signal?: AbortSignal) => {
      const jwt = Cookies.get('jwt');

      if (!jwt) {
        return Promise.resolve({ data: 'User is not authenticated' });
      }

      return fetchService.post<GetModelsRequestProps>(`/api/acrcrthae`, {
        body: { key: params.key },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('jwt')}`,
        },
        signal,
      });
    },
    [fetchService],
  );

  return {
    getModels,
  };
};

export default useApiService;
