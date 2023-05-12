import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {API_BASE_URL} from "@/http/axios";

export const catalogApi = createApi({
  reducerPath: 'catalog',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/product/catalog/values`
  }),
  endpoints: (build) => ({
    getCatalog: build.mutation({
      query: (limit: number) => (
        {
            method: 'POST',
            url: `/${limit}/1/`
        }
      )
    })
  })
});

export const { useGetCatalogMutation } = catalogApi;