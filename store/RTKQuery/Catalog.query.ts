import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {API_BASE_URL} from "@/http/axios";

export const catalogApi = createApi({
  reducerPath: 'catalog',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/product/catalog/values`
  }),
  endpoints: (build) => ({
    getCatalog: build.mutation({
      query: (obj: {limit: number, sort: string, Level2: string, Level3: string}) => (
        {
            method: 'POST',
            url: `/${obj.limit}/1/`,
            body: {
              sort: obj.sort,
              Level2: obj.Level2,
              Level3: obj.Level3,
              updateFilters: '1',
            }
        }
      )
    })
  })
});

export const { useGetCatalogMutation } = catalogApi;