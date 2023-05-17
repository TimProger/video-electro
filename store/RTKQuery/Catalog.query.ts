import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {API_BASE_URL} from "@/http/axios";
import {ICatalogQuery} from "@/types/Product.types";

export const catalogApi = createApi({
  reducerPath: 'catalog',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/product/catalog/values`
  }),
  endpoints: (build) => ({
    getCatalog: build.mutation({
      query: (obj: {limit: number, body: ICatalogQuery}) => (
        {
            method: 'POST',
            url: `/${obj.limit}/1/`,
            body: {
              ...obj.body,
              updateFilters: '1'
            }
        }
      )
    })
  })
});

export const { useGetCatalogMutation } = catalogApi;