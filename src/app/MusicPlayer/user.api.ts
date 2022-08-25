import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface ILoginUser {
  email: string;
  password: string;
}

export const userApi = createApi({
  reducerPath: 'user/api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://51.250.72.80:8090/' }),
  endpoints: build => ({
    userToken: build.mutation({
      query: (body: ILoginUser) => ({
        url: 'user/token/',
        method: 'POST',
        body,
      })
    }),
  })
});

export const { useUserTokenMutation } = userApi;
