// import { build } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/cacheLifecycle'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITrack } from '../../models'
import { RootState } from '../store';

export interface ILoginUser {
  email: string;
  password: string;
}

export const musicPlayerApi = createApi({
  reducerPath: 'music-player/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://51.250.72.80:8090/',
    // baseUrl: 'http://84.201.139.95:8000/',
    // baseUrl: 'https://629470d963b5d108c18b87da.mockapi.io/',
    // prepareHeaders: (headers, { getState }) => {
    //   headers.set('Access-Control-Allow-Origin', '*');
    //   return headers
    // },
    // prepareHeaders: (headers) => {
    //     headers.set("Content-Type", "application/json");
    //     return headers;
    //   },
    // prepareHeaders: (headers, { getState }) => {
    //     headers.set("Cookie", "csrftoken=dVjAvz945M9pepzlSvPXecOkWe9h2sAWIzZGVPIAnSOQmR0lw46YR8aGiJVQvwTM");
    //     return headers;
    //   },
    // mode: 'cors'
    // mode: 'no-cors'
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).token.access;
      if (token) headers.set('authorization', `Bearer ${token}`);
      // headers.set('authorization', `Bearer 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90e…I6MX0.rs8EABzKCtHtpYKCYVFj3UiOwdr1l0nFuGribAHvZzY'`);
      console.log('headers token-->', token);
      return headers;
    },
  }),
  endpoints: build => ({
    getTracks: build.query ({
      query: () => 'catalog/track/all/'

        // {
        // url: 'todos',
        // url: 'catalog/track/all/',
        // params: {
        //   page: page
        // },
        // Headers: {
        //   header: 'Access-Control-Allow-Origin: *'
        // }
        // Headers: {
        //   Cookie: 'csrftoken=dVjAvz945M9pepzlSvPXecOkWe9h2sAWIzZGVPIAnSOQmR0lw46YR8aGiJVQvwTM'
        // }
      // }  
    }),
    loginUser: build.mutation({
      query: (body: ILoginUser) => ({
        url: 'user/login/',
        method: 'POST',
        body,
      })
    }),
    userToken: build.mutation({
      query: (body: ILoginUser) => ({
        url: 'user/token/',
        method: 'POST',
        body,
      })
    }),
    // refreshUserToken: build.mutation<ILoginUser, string>({
    refreshUserToken: build.mutation({
      query: (body: string) => ({
        url: 'user/token/refresh/',
        method: 'POST',
        body,
      })
    }),
    addTrackToFavorite: build.mutation({
      query: (trackId: number) => ({
        url: `catalog/track/${trackId}/favorite/`,
        method: 'POST',
      })
    })
  })
})

export const {
  useGetTracksQuery,
  useLoginUserMutation,
  useUserTokenMutation,
  useAddTrackToFavoriteMutation
} = musicPlayerApi
