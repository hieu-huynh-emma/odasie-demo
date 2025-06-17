import { describe, expect, it } from 'vitest';

import { QueryMapper, ContentTypeConfig, QueryCriteria } from '..';

describe('QueryMapper', () => {
  const mockContentTypeConfig: ContentTypeConfig = {
    sortableFields: ['name', 'createdAt', 'price'],
    filterableFields: ['name', 'price', 'category', 'createdAt'],
    filterableRangeFields: ['price', 'createdAt'],
    searchableFields: ['name', 'description'],
    populateFields: ['author', 'comments', 'category'],
    defaultSort: ['createdAt:desc'],
    defaultPopulate: ['author'],
    defaultPageSize: 10,
    maxPageSize: 50,
    maxDepth: 2,
    fieldOperators: {
      price: { allowed: ['$gte', '$lte', '$in'], default: '$gte' },
      name: { allowed: ['$containsi'], default: '$containsi' },
    },
    fieldTypes: {
      name: { type: 'string', required: true },
      price: { type: 'number', min: 0 },
      category: { type: 'string' },
      createdAt: { type: 'date' },
    },
  };

  describe('fromUrl', () => {
    it('should parse pagination parameters', () => {
      const queryMapper = new QueryMapper(mockContentTypeConfig);
      const urlSearchParams = new URLSearchParams('page=2&pageSize=20');

      const criteria = queryMapper.fromUrl(urlSearchParams);

      expect(criteria.pagination).toEqual({
        page: 2,
        pageSize: 20,
        withCount: true,
      });
    });

    it('should parse sort parameters', () => {
      const queryMapper = new QueryMapper(mockContentTypeConfig);
      const urlSearchParams = new URLSearchParams('sort=name:asc,price:desc');

      const criteria = queryMapper.fromUrl(urlSearchParams);

      expect(criteria.sort).toEqual(['name:asc', 'price:desc']);
    });

    it('should use default sort if no sort parameter is provided', () => {
      const queryMapper = new QueryMapper(mockContentTypeConfig);
      const urlSearchParams = new URLSearchParams();

      const criteria = queryMapper.fromUrl(urlSearchParams);

      expect(criteria.sort).toEqual(['createdAt:desc']);
    });

    it('should parse filter parameters', () => {
      const queryMapper = new QueryMapper(mockContentTypeConfig);
      const urlSearchParams = new URLSearchParams(
        'name=phone&price_min=100&price_max=500',
      );

      const criteria = queryMapper.fromUrl(urlSearchParams);

      expect(criteria.filters).toEqual({
        name: { $containsi: 'phone' },
        price: { $gte: '100', $lte: '500' },
      });
    });

    it('should parse search parameter', () => {
      const queryMapper = new QueryMapper(mockContentTypeConfig);
      const urlSearchParams = new URLSearchParams('search=laptop');

      const criteria = queryMapper.fromUrl(urlSearchParams);

      expect(criteria.filters).toEqual({
        $or: [
          { name: { $containsi: 'laptop' } },
          { description: { $containsi: 'laptop' } },
        ],
      });
    });

    it('should parse fields parameter', () => {
      const queryMapper = new QueryMapper(mockContentTypeConfig);
      const urlSearchParams = new URLSearchParams('fields=name,price');

      const criteria = queryMapper.fromUrl(urlSearchParams);

      expect(criteria.fields).toEqual(['name', 'price']);
    });

    it('should parse populate parameter', () => {
      const queryMapper = new QueryMapper(mockContentTypeConfig);
      const urlSearchParams = new URLSearchParams('with=author,comments');

      const criteria = queryMapper.fromUrl(urlSearchParams);

      expect(criteria.populate).toEqual(['author', 'comments']);
    });

    it('should use default populate if no populate parameter is provided', () => {
      const queryMapper = new QueryMapper(mockContentTypeConfig);
      const urlSearchParams = new URLSearchParams();

      const criteria = queryMapper.fromUrl(urlSearchParams);

      expect(criteria.populate).toEqual(['author']);
    });

    it('should parse filters with range and search parameters', () => {
      const queryMapper = new QueryMapper(mockContentTypeConfig);
      const urlSearchParams = new URLSearchParams(
        'price_min=100&price_max=500&search=laptop',
      );

      const criteria = queryMapper.fromUrl(urlSearchParams);

      expect(criteria.filters).toEqual({
        $or: [
          { name: { $containsi: 'laptop' } },
          { description: { $containsi: 'laptop' } },
        ],
        price: { $gte: '100', $lte: '500' },
      });
    });

    it('should handle search when no searchable fields are configured', () => {
      const queryMapper = new QueryMapper({
        ...mockContentTypeConfig,
        searchableFields: [],
      });
      const urlSearchParams = new URLSearchParams('search=laptop');

      const criteria = queryMapper.fromUrl(urlSearchParams);

      expect(criteria.filters).toEqual({});
    });

    it('should ignore filters for fields not in filterableFields', () => {
      const queryMapper = new QueryMapper(mockContentTypeConfig);
      const urlSearchParams = new URLSearchParams('invalidField=value');

      const criteria = queryMapper.fromUrl(urlSearchParams);

      expect(criteria.filters).toEqual({});
    });

    it('should handle nested filters', () => {
      const queryMapper = new QueryMapper(mockContentTypeConfig);
      const urlSearchParams = new URLSearchParams('category.name=electronics');

      const criteria = queryMapper.fromUrl(urlSearchParams);

      expect(criteria.filters).toEqual({
        category: {
          name: { $containsi: 'electronics' },
        },
      });
    });

    it('should handle invalid pagination values gracefully', () => {
      const queryMapper = new QueryMapper(mockContentTypeConfig);
      const urlSearchParams = new URLSearchParams('page=abc&pageSize=-10');

      const criteria = queryMapper.fromUrl(urlSearchParams);

      expect(criteria.pagination).toEqual({
        page: 1,
        pageSize: 1,
        withCount: true,
      });
    });

    it('should ignore sort fields not in sortableFields', () => {
      const queryMapper = new QueryMapper(mockContentTypeConfig);
      const urlSearchParams = new URLSearchParams(
        'sort=invalidField:asc,price:desc',
      );

      const criteria = queryMapper.fromUrl(urlSearchParams);

      expect(criteria.sort).toEqual(['price:desc']);
    });

    it('should ignore populate fields exceeding max depth', () => {
      const queryMapper = new QueryMapper(mockContentTypeConfig);
      const urlSearchParams = new URLSearchParams(
        'with=author,author.profile.deepField',
      );

      const criteria = queryMapper.fromUrl(urlSearchParams);

      expect(criteria.populate).toEqual(['author']);
    });

    it('should handle empty search parameters gracefully', () => {
      const queryMapper = new QueryMapper(mockContentTypeConfig);
      const urlSearchParams = new URLSearchParams();

      const criteria = queryMapper.fromUrl(urlSearchParams);

      expect(criteria).toEqual({
        populate: ['author'],
        fields: undefined,
        filters: {},
        sort: ['createdAt:desc'],
        pagination: { page: 1, pageSize: 10, withCount: true },
      });
    });
  });

  describe('toUrl', () => {
    it('should serialize pagination parameters', () => {
      const queryMapper = new QueryMapper(mockContentTypeConfig);
      const criteria: QueryCriteria = {
        pagination: { page: 2, pageSize: 20 },
      };

      const queryString = queryMapper.toUrl(criteria);

      expect(queryString).toContain('page=2');
      expect(queryString).toContain('pageSize=20');
    });

    it('should serialize sort parameters', () => {
      const queryMapper = new QueryMapper(mockContentTypeConfig);
      const criteria: QueryCriteria = {
        sort: ['name:asc', 'price:desc'],
      };

      const queryString = queryMapper.toUrl(criteria);

      expect(queryString).toContain(
        new URLSearchParams('sort=name:asc,price:desc').toString(),
      );
    });

    it('should serialize filter parameters', () => {
      const queryMapper = new QueryMapper(mockContentTypeConfig);
      const criteria: QueryCriteria = {
        filters: {
          name: { $containsi: 'phone' },
          price: { $gte: 100, $lte: 500 },
        },
      };

      const queryString = queryMapper.toUrl(criteria);

      expect(queryString).toContain('name=phone');
      expect(queryString).toContain('price_min=100');
      expect(queryString).toContain('price_max=500');
    });

    it('should serialize fields parameter', () => {
      const queryMapper = new QueryMapper(mockContentTypeConfig);
      const criteria: QueryCriteria = {
        fields: ['name', 'price'],
      };

      const queryString = queryMapper.toUrl(criteria);

      expect(queryString).toContain(
        new URLSearchParams('fields=name,price').toString(),
      );
    });

    it('should serialize populate parameter', () => {
      const queryMapper = new QueryMapper(mockContentTypeConfig);
      const criteria: QueryCriteria = {
        populate: ['author', 'comments'],
      };

      const queryString = queryMapper.toUrl(criteria);

      expect(queryString).toContain(
        new URLSearchParams('with=author,comments').toString(),
      );
    });

    it('should handle empty criteria gracefully', () => {
      const queryMapper = new QueryMapper(mockContentTypeConfig);
      const criteria: QueryCriteria = {};

      const queryString = queryMapper.toUrl(criteria);

      expect(queryString).toBe('');
    });

    it('should serialize search parameter for multiple searchable fields', () => {
      const queryMapper = new QueryMapper(mockContentTypeConfig);
      const criteria: QueryCriteria = {
        filters: {
          $or: [
            { name: { $containsi: 'laptop' } },
            { description: { $containsi: 'laptop' } },
          ],
        },
      };

      const queryString = queryMapper.toUrl(criteria);

      expect(queryString).toContain('search=laptop');
    });

    it('should serialize nested filters into URL correctly', () => {
      const queryMapper = new QueryMapper(mockContentTypeConfig);
      const criteria: QueryCriteria = {
        filters: {
          category: {
            name: {
              $eq: 'electronics',
            },
          },
          $or: [
            { name: { $containsi: 'laptop' } },
            { description: { $containsi: 'laptop' } },
          ],
        },
      };

      const queryString = queryMapper.toUrl(criteria);

      expect(queryString).toContain('category.name=electronics');
    });

    it('should ignore invalid filters during serialization', () => {
      const queryMapper = new QueryMapper(mockContentTypeConfig);
      const criteria: QueryCriteria = {
        filters: {
          invalidField: { $eq: 'value' },
        },
      };

      const queryString = queryMapper.toUrl(criteria);

      expect(queryString).not.toContain('invalidField');
    });
  });
});
