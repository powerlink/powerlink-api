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

export interface ViewRecordsConfig {
  fields: [ViewFields],
  conditionGroups: [],
  pageNumber: number,
  sortBy: ViewSortBy
}

interface ViewFields {
  name: string,
  logicalName: string,
  fieldObjectType: number,
  label: string,
  type: string,
}

interface ViewSortBy {
  fieldName: string,
  type: sortType  
}

type sortType = "desc" | "asc";