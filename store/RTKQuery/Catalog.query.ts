import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const catalogApi = createApi({
  reducerPath: 'catalog',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/catalog/'
  }),
  endpoints: (build) => ({
    getCatalog: build.query({
      query: (limit = '') => `?${limit ? `_limit=${limit}` : ''}`
    })
  })
});

export const { useGetCatalogQuery } = catalogApi;