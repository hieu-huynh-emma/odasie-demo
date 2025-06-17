export type SortOrder = 'asc' | 'desc';

export type FilterOperators = {
  $eq?: any;
  $eqi?: any;
  $ne?: any;
  $nei?: any;
  $lt?: any;
  $lte?: any;
  $gt?: any;
  $gte?: any;
  $in?: any[];
  $notIn?: any[];
  $contains?: string;
  $notContains?: string;
  $containsi?: string;
  $notContainsi?: string;
  $null?: boolean;
  $notNull?: boolean;
  $between?: [any, any];
  $startsWith?: string;
  $startsWithi?: string;
  $endsWith?: string;
  $endsWithi?: string;
  $or?: Record<string, any>[];
  $and?: Record<string, any>[];
  $not?: Record<string, any>;
};

export type FilterValue =
  | string
  | number
  | boolean
  | FilterOperators
  | NestedFilterValue;

export type NestedFilterValue = {
  [key: string]: FilterValue | NestedFilterValue;
};

export type QueryCriteria = {
  populate?: string | string[] | Record<string, any>;
  fields?: string[];
  filters?: Record<string, FilterValue | FilterValue[]>;
  locale?: string;
  sort?: string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    withCount?: boolean;
  };
};

export type FieldType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'date'
  | 'array'
  | 'object';

export type FieldTypeConfig = {
  type: FieldType;
  format?: string;
  min?: number;
  max?: number;
  pattern?: RegExp;
  enum?: any[];
  arrayType?: FieldType;
  required?: boolean;
  default?: any;
};

export type ContentTypeConfig = {
  sortableFields: string[];
  filterableFields: string[];
  filterableRangeFields?: string[];
  searchableFields: string[];
  populateFields: string[];
  defaultSort?: string[];
  defaultPopulate?: string[];
  defaultPageSize?: number;
  maxPageSize?: number;
  maxDepth?: number;
  fieldOperators?: Record<
    string,
    {
      allowed?: (keyof FilterOperators)[];
      default?: keyof FilterOperators;
    }
  >;
  fieldTypes: Record<string, FieldTypeConfig>;
};
