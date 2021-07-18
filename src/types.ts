export interface QueryParams {
  pageSize?: number;
  objectType: number;
  pageNumber?: number;
  sortBy?: string;
  fields?: string;
  conditions?: string;
  sortType?: sortType;
}

export interface ConvertedQueryParams {
  objecttype: number;
  page_size?: number;
  page_number?: number;
  fields?: string;
  query?: string;
  sort_by?: string;
  sort_type?: sortType;
}

type sortType = "desc" | "asc";
