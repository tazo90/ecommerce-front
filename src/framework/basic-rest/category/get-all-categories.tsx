import { useQuery } from 'react-query';

import { Category } from "@framework/types";
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';

export async function fetchCategories({ queryKey }: any) {
  const [_key, _params] = queryKey;
  const { data: { menu } } = await http.get(API_ENDPOINTS.CATEGORIES);
  return {
    categories: menu.categories
  };
};

export function useCategoriesQuery(options) {
  return useQuery<{ categories: { data: Category[] }}, Error>(
    [API_ENDPOINTS.CATEGORIES, options],
    fetchCategories
  )
}