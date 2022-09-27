import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICollection, ITrack, IUser, IUserTokens } from '../models'
import { checkJWTExpTime } from '../utils';
import { RootState } from '../store';

export interface ILoginUser {
  email: string;
  password: string;
}

export interface ISignupUser {
  username: string;
  email: string;
  password: string;
}

export const musicPlayerApi = createApi({
  reducerPath: 'music-player/api',
  tagTypes: ['Tracks'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://51.250.72.80:8090/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).token.access;
      if (token && checkJWTExpTime(token)) headers.set('authorization', `Bearer ${token}`);
      console.log('headers token-->', token);
      return headers;
    },
  }),
  endpoints: build => ({
    getTracks: build.query<ITrack[], void> ({
      query: () => 'catalog/track/all/',
      providesTags: (result) => result 
        ? [
          ...result.map(({ id }) => ({ type: 'Tracks' as const, id })),
          { type: 'Tracks', id: 'LIST' },
        ]
        : [{ type: 'Tracks', id: 'LIST' }],
    }),
    getTrack: build.query<ITrack, number> ({
      query: (trackId: number) => `catalog/track/${trackId}/`,
    }),
    loginUser: build.mutation({
      query: (body: ILoginUser) => ({
        url: 'user/login/',
        method: 'POST',
        body,
      })
    }),
    userSignup: build.mutation({
      query: (body: ISignupUser) => ({
        url: 'user/signup/',
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
    refreshUserToken: build.mutation<IUserTokens, string> ({
      query: (body: string) => ({
        url: 'user/token/refresh/',
        method: 'POST',
        body: { 'refresh': body },
      })
    }),
    addTrackToFavorite: build.mutation({
      query: (trackId: number) => ({
        url: `catalog/track/${trackId}/favorite/`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Tracks', id: 'LIST' }]
    }),
    removeTrackFromFavorite: build.mutation({
      query: (trackId: number) => ({
        url: `catalog/track/${trackId}/favorite/`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Tracks', id: 'LIST' }]
    }),
    getCollection: build.query<ICollection, number> ({
      query: (collectionId) => `catalog/selection/${collectionId}/`,
      providesTags: (result) => result?.items
        ? [
          ...result.items.map(({ id }) => ({ type: 'Tracks' as const, id })),
          { type: 'Tracks', id: 'LIST' },
        ]
        : [{ type: 'Tracks', id: 'LIST' }],
    }),
    getCurrentUser: build.query<IUser, number> ({
      query: (sessionId: number) => `user/me/`,
    }),
    getCurrentUserCached: build.query<IUser, void> ({
      query: () => `user/me/`,
    }),
  }),
})

export const {
  useGetTracksQuery,
  useGetTrackQuery,
  useLoginUserMutation,
  useUserSignupMutation,
  useUserTokenMutation,
  useRefreshUserTokenMutation,
  useAddTrackToFavoriteMutation,
  useRemoveTrackFromFavoriteMutation,
  useGetCollectionQuery,
  useGetCurrentUserQuery,
  useGetCurrentUserCachedQuery,
} = musicPlayerApi
