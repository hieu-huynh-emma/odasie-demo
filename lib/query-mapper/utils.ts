import { FilterValue } from './types';

export function convertToOrFilter(
  filters?: Record<string, FilterValue | FilterValue[]>,
) {
  if (!filters) {
    return undefined;
  }

  return {
    $or: Object.entries(filters).map(([key, value]) => ({
      [key]: value,
    })),
  };
}
