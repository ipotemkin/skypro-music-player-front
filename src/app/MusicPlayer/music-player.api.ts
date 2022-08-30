import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITrack, IUserTokens } from '../../models'
import { RootState } from '../store';

export interface ILoginUser {
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
      if (token) headers.set('authorization', `Bearer ${token}`);
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
    })
  })
})

export const {
  useGetTracksQuery,
  useLoginUserMutation,
  useUserTokenMutation,
  useRefreshUserTokenMutation,
  useAddTrackToFavoriteMutation,
  useRemoveTrackFromFavoriteMutation
} = musicPlayerApi
