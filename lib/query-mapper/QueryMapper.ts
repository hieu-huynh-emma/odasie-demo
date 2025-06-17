import {
  ContentTypeConfig,
  FilterOperators,
  FilterValue,
  QueryCriteria,
} from './types';

export class QueryMapper {
  constructor(private config: ContentTypeConfig) {
    this.config = config;
  }

  fromUrl(searchParams: URLSearchParams): QueryCriteria {
    const criteria = {
      populate: this.getPopulate(searchParams),
      fields: this.getFields(searchParams),
      filters: this.getFilters(searchParams),
      sort: this.getSort(searchParams),
      pagination: this.getPagination(searchParams),
    };

    return criteria;
  }

  private getPagination(params: URLSearchParams) {
    const page = Math.max(1, Number(params.get('page')) || 1);
    const pageSize = Math.min(
      this.config.maxPageSize ?? 100,
      Math.max(
        1,
        Number(params.get('pageSize')) || (this.config.defaultPageSize ?? 10),
      ),
    );

    return {
      page,
      pageSize,
      withCount: true,
    };
  }

  private getSort(params: URLSearchParams): string[] {
    const sortParam = params.get('sort');

    if (!sortParam) {
      return this.config.defaultSort || ['createdAt:desc'];
    }

    return sortParam.split(',').reduce<string[]>((acc, sort) => {
      const [field, order] = sort.split(':');

      if (this.config.sortableFields.includes(field)) {
        acc.push(`${field}:${order?.toLowerCase() === 'asc' ? 'asc' : 'desc'}`);
      }

      return acc;
    }, []);
  }

  private getFilters(
    params: URLSearchParams,
  ): Record<string, FilterValue | FilterValue[]> {
    const filters: Record<string, FilterValue | FilterValue[]> = {};

    const search = params.get('search');
    if (search) {
      const searchableFields = this.config.searchableFields.map(field => ({
        [field]: { $containsi: search },
      }));

      if (searchableFields.length) {
        filters.$or = searchableFields;
      }
    }

    for (const [field, value] of params.entries()) {
      if (
        !this.config.filterableFields.includes(field) &&
        !this.config.filterableFields.some(f => field.startsWith(`${f}.`))
      ) {
        continue;
      }

      if (this.isFilterKey(field)) {
        if (field.includes('.')) {
          const path = field.split('.');
          Object.assign(filters, this.parseNestedFilter(path, value));
        } else {
          filters[field] = this.parseFilterValue(field, value);
        }
      }
    }

    this.config.filterableRangeFields?.forEach(field => {
      const min = params.get(`${field}_min`);
      const max = params.get(`${field}_max`);
      if (min || max) {
        if (field.includes('.')) {
          const path = field.split('.');
          Object.assign(filters, this.parseNestedFilter(path, `${min},${max}`));
        } else {
          filters[field] = {};

          if (min) {
            filters[field].$gte = min;
          }

          if (max) {
            filters[field].$lte = max;
          }
        }
      }
    });

    return filters;
  }

  private isFilterKey(key: string): boolean {
    return !['search', 'sort', 'page', 'pageSize'].includes(key);
  }

  private parseNestedFilter(path: string[], value: string): FilterValue {
    if (path.length === 1) {
      const field = path[0];
      return {
        [field]: this.parseFilterValue(field, value),
      };
    }

    const [current, ...rest] = path;
    return {
      [current]: this.parseNestedFilter(rest, value),
    };
  }

  private parseFilterValue(field: string, value: string): FilterValue {
    const fieldOperators = this.config.fieldOperators?.[field];
    const operator = fieldOperators?.default || '$eq';

    const splitAndTrim = (value: string) => value.split(',').map(v => v.trim());

    const operatorMapping: Record<string, (value: string) => FilterValue> = {
      $in: value => ({ $in: splitAndTrim(value) }),
      $notIn: value => ({ $notIn: splitAndTrim(value) }),
      $between: value => {
        const [min, max] = splitAndTrim(value);
        return { $gte: min, $lte: max };
      },
    };

    for (const op of Object.keys(operatorMapping)) {
      if (fieldOperators?.allowed?.includes(op as keyof FilterOperators)) {
        return operatorMapping[op](value);
      }
    }

    return { [operator]: value };
  }

  private getFields(params: URLSearchParams): string[] | undefined {
    const fields = params.get('fields');

    if (!fields) {
      return undefined;
    }

    return fields.split(',').filter(field => field in this.config.fieldTypes);
  }

  private getPopulate(params: URLSearchParams): string[] | undefined {
    const populate = params.get('with');

    if (!populate) {
      return this.config.defaultPopulate;
    }

    return populate.split(',').filter(field => {
      const depth = field.split('.').length;

      if (depth > (this.config.maxDepth ?? 1)) {
        return false;
      }

      return this.config.populateFields.includes(field);
    });
  }

  toUrl(criteria: QueryCriteria): string {
    const params = new URLSearchParams();

    this.setPopulate(params, criteria.populate);
    this.setFields(params, criteria.fields);
    this.setFilters(params, criteria.filters);
    this.setSort(params, criteria.sort);
    this.setPagination(params, criteria.pagination);

    return params.toString();
  }

  private setPagination(
    params: URLSearchParams,
    pagination?: QueryCriteria['pagination'],
  ) {
    if (!pagination) {
      return;
    }

    const { page = 1, pageSize = this.config.defaultPageSize ?? 10 } =
      pagination;

    if (page > 1) {
      params.set('page', page.toString());
    }

    if (pageSize !== this.config.defaultPageSize) {
      params.set('pageSize', pageSize.toString());
    }
  }

  private setSort(params: URLSearchParams, sort?: QueryCriteria['sort']) {
    if (sort?.length) {
      params.set('sort', sort.join(','));
    }
  }

  private setFilters(
    params: URLSearchParams,
    filters?: QueryCriteria['filters'],
  ) {
    if (!filters) {
      return;
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (['$or', '$and', '$not'].includes(key)) {
        this.setLogicalOperator(params, key, value);
        return;
      }

      if (typeof value === 'object' && !Array.isArray(value)) {
        if (this.isNestedFilter(key, value)) {
          this.setNestedFilters(params, key, value as FilterValue);
        } else {
          this.setFilterOperators(params, key, value as Record<string, any>);
        }
      } else {
        params.set(key, String(value));
      }
    });

    if (filters.$or) {
      const searchValues = (filters.$or as Record<string, any>[]).flatMap(
        filter =>
          Object.entries(filter).map(([, condition]) => {
            if (typeof condition === 'object' && '$containsi' in condition) {
              return condition.$containsi;
            }

            return null;
          }),
      );

      const uniqueSearchValues = Array.from(
        new Set(searchValues.filter(v => v)),
      );
      if (uniqueSearchValues.length) {
        params.set('search', uniqueSearchValues.join(','));
      }
    }
  }

  private isNestedFilter(key: string, value: any): boolean {
    return (
      typeof value === 'object' &&
      !Array.isArray(value) &&
      !Object.keys(value).some(k => k.startsWith('$'))
    );
  }

  private setNestedFilters(
    params: URLSearchParams,
    parentKey: string,
    filters: FilterValue,
    prefix: string = '',
  ) {
    const currentPath = prefix ? `${prefix}.${parentKey}` : parentKey;

    Object.entries(filters).forEach(([key, value]) => {
      if (typeof value === 'object' && !Array.isArray(value)) {
        if (this.isNestedFilter(key, value)) {
          this.setNestedFilters(params, key, value as FilterValue, currentPath);
        } else {
          this.setFilterOperators(
            params,
            `${currentPath}.${key}`,
            value as Record<string, any>,
          );
        }
      } else {
        params.set(`${currentPath}.${key}`, String(value));
      }
    });
  }

  private setFilterOperators(
    params: URLSearchParams,
    key: string,
    operators: Record<string, any>,
  ) {
    if (
      !this.config.filterableFields.includes(key) &&
      !this.config.filterableFields.some(f => key.startsWith(`${f}.`))
    ) {
      return;
    }

    Object.entries(operators).forEach(([operator, operatorValue]) => {
      switch (operator) {
        case '$containsi':
          params.set(key, operatorValue as string);
          break;
        case '$in':
          params.set(
            key,
            Array.isArray(operatorValue)
              ? operatorValue.join(',')
              : String(operatorValue),
          );
          break;
        case '$gte':
          params.set(`${key}_min`, String(operatorValue));
          break;
        case '$lte':
          params.set(`${key}_max`, String(operatorValue));
          break;
        case '$between':
          params.set(
            key,
            Array.isArray(operatorValue)
              ? operatorValue.join(',')
              : String(operatorValue),
          );
          break;
        case '$eq':
          params.set(key, String(operatorValue));
          break;
        default:
          if (
            this.config.fieldOperators?.[key]?.allowed?.includes(
              operator as any,
            )
          ) {
            this.setCustomOperator(params, key, operator, operatorValue);
          }
      }
    });
  }

  private setLogicalOperator(
    params: URLSearchParams,
    operator: string,
    value: any,
  ) {
    switch (operator) {
      case '$or':
      case '$and':
        if (Array.isArray(value)) {
          value.forEach((condition, index) => {
            Object.entries(condition).forEach(([field, fieldValue]) => {
              const paramKey = `${operator}.${index}.${field}`;
              if (
                typeof fieldValue === 'object' &&
                !Array.isArray(fieldValue)
              ) {
                this.setFilterOperators(
                  params,
                  paramKey,
                  fieldValue as Record<string, any>,
                );
              } else {
                params.set(paramKey, String(fieldValue));
              }
            });
          });
        }
        break;
      case '$not':
        if (typeof value === 'object' && !Array.isArray(value)) {
          Object.entries(value).forEach(([field, fieldValue]) => {
            const paramKey = `${operator}.${field}`;
            if (typeof fieldValue === 'object' && !Array.isArray(fieldValue)) {
              this.setFilterOperators(
                params,
                paramKey,
                fieldValue as Record<string, any>,
              );
            } else {
              params.set(paramKey, String(fieldValue));
            }
          });
        }
        break;
    }
  }

  private setCustomOperator(
    params: URLSearchParams,
    key: string,
    operator: string,
    value: any,
  ) {
    const operatorKey = `${key}[${operator}]`;
    params.set(
      operatorKey,
      Array.isArray(value) ? value.join(',') : String(value),
    );
  }

  private setFields(params: URLSearchParams, fields?: QueryCriteria['fields']) {
    if (fields?.length) {
      params.set('fields', fields.join(','));
    }
  }

  private setPopulate(
    params: URLSearchParams,
    populate?: QueryCriteria['populate'],
  ) {
    if (Array.isArray(populate) && populate.length) {
      params.set('with', populate.join(','));
    } else if (typeof populate === 'object' && Object.keys(populate).length) {
      params.set('with', Object.keys(populate).join(','));
    } else if (typeof populate === 'string' && populate.length) {
      params.set('with', populate);
    }
  }
}
