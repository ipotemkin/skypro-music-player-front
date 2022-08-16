// import { build } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/cacheLifecycle'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITrack } from '../../models'

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
  }),
  endpoints: build => ({
    getTracks: build.query<ITrack[], number> ({
      query: () => ('catalog/track/all/'
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
      )
    })
  })
})

export const { useGetTracksQuery } = musicPlayerApi
