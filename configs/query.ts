import { ContentTypeConfig } from '@/lib/query-mapper';

export const BlogArticleConfig: ContentTypeConfig = {
  sortableFields: [],
  filterableFields: ['countries', 'experiences', 'regions', 'countries.slug'],
  filterableRangeFields: [],
  searchableFields: ['title', 'content'],
  populateFields: ['seo', 'image', 'author', 'author.avatar'],
  defaultSort: ['createdAt:desc'],
  defaultPopulate: ['seo', 'image', 'author', 'author.avatar'],
  defaultPageSize: 10,
  maxPageSize: 50,
  maxDepth: 2,
  fieldOperators: {
    price: { allowed: ['$gte', '$lte', '$in'], default: '$gte' },
    name: { allowed: ['$containsi'], default: '$containsi' },
  },
  fieldTypes: {
    title: { type: 'string' },
    slug: { type: 'string' },
  },
};

export const TourConfig: ContentTypeConfig = {
  sortableFields: [],
  filterableFields: [
    'travelTypes',
    'travelTypes.slug',
    'country.slug',
    'regions.slug',
    'experiences',
    'experiences.slug',
    'festivals',
    'festivals.slug',
  ],
  filterableRangeFields: ['duration', 'startingPrice.price'],
  searchableFields: ['title', 'content'],
  populateFields: [],
  defaultSort: ['createdAt:desc'],
  defaultPopulate: [
    'image',
    'startingPrice',
    'author',
    'author.avatar',
    'tourGuide',
    'tourGuide.avatar',
  ],
  defaultPageSize: 10,
  maxPageSize: 50,
  maxDepth: 2,
  fieldOperators: {
    price: { allowed: ['$between'], default: '$between' },
    duration: { allowed: ['$gte', '$lte', '$in'], default: '$gte' },
    name: { allowed: ['$containsi'], default: '$containsi' },
  },
  fieldTypes: {
    title: { type: 'string' },
    slug: { type: 'string' },
  },
};

export const ExperienceConfig: ContentTypeConfig = {
  sortableFields: [],
  filterableFields: ['countries', 'countries.slug', 'regions', 'regions.slug'],
  filterableRangeFields: [],
  searchableFields: ['name', 'description'],
  populateFields: [],
  defaultSort: ['createdAt:desc'],
  defaultPopulate: ['image', 'tours', 'roundImage'],
  defaultPageSize: 10,
  maxPageSize: 50,
  maxDepth: 2,
  fieldOperators: {
    price: { allowed: ['$gte', '$lte', '$in'], default: '$gte' },
    name: { allowed: ['$containsi'], default: '$containsi' },
  },
  fieldTypes: {
    title: { type: 'string' },
    slug: { type: 'string' },
  },
};

export const FestivalConfig: ContentTypeConfig = {
  sortableFields: [],
  filterableFields: ['countries', 'countries.slug', 'regions', 'regions.slug'],
  filterableRangeFields: [],
  searchableFields: ['name', 'description'],
  populateFields: [],
  defaultSort: ['createdAt:desc'],
  defaultPopulate: ['image', 'tours', 'roundImage'],
  defaultPageSize: 10,
  maxPageSize: 50,
  maxDepth: 2,
  fieldOperators: {
    price: { allowed: ['$gte', '$lte', '$in'], default: '$gte' },
    name: { allowed: ['$containsi'], default: '$containsi' },
  },
  fieldTypes: {
    title: { type: 'string' },
    slug: { type: 'string' },
  },
};

export const CustomerReviewConfig: ContentTypeConfig = {
  sortableFields: [],
  filterableFields: [],
  filterableRangeFields: [],
  searchableFields: [],
  populateFields: [],
  defaultSort: ['createdAt:desc'],
  defaultPopulate: ['image', 'tour'],
  defaultPageSize: 10,
  maxPageSize: 50,
  maxDepth: 2,
  fieldOperators: {
    price: { allowed: ['$gte', '$lte', '$in'], default: '$gte' },
    name: { allowed: ['$containsi'], default: '$containsi' },
  },
  fieldTypes: {
    title: { type: 'string' },
    slug: { type: 'string' },
  },
};

export const RegionConfig: ContentTypeConfig = {
  sortableFields: [],
  filterableFields: ['country', 'country.slug'],
  filterableRangeFields: [],
  searchableFields: [],
  populateFields: [],
  defaultSort: ['createdAt:desc'],
  defaultPopulate: ['image', 'country', 'country.image'],
  defaultPageSize: 10,
  maxPageSize: 50,
  maxDepth: 2,
  fieldOperators: {
    price: { allowed: ['$gte', '$lte', '$in'], default: '$gte' },
    name: { allowed: ['$containsi'], default: '$containsi' },
  },
  fieldTypes: {
    title: { type: 'string' },
    slug: { type: 'string' },
  },
};

export const TravelTypeConfig: ContentTypeConfig = {
  sortableFields: [],
  filterableFields: ['countries', 'countries.slug', 'name'],
  filterableRangeFields: [],
  searchableFields: ['name'],
  populateFields: [],
  defaultSort: ['createdAt:desc'],
  defaultPopulate: ['image', 'tours'],
  defaultPageSize: 10,
  maxPageSize: 50,
  maxDepth: 2,
  fieldOperators: {
    name: { allowed: ['$containsi', '$ne'], default: '$containsi' },
  },
  fieldTypes: {
    name: { type: 'string' },
    slug: { type: 'string' },
  },
};
