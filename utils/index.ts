export function getCorrectPage(page: any) {
  try {
    const pageNumber = Number(page);

    return Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1;
  } catch {
    return 1;
  }
}

export function getFilterItems(items: any) {
  if (!items) {
    return [];
  }

  return items.map((item: any) => ({ id: item.id }));
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function roundToNearest(value: number, step: number) {
  return Math.round(value / step) * step;
}

type HasOrder = {
  order: null | number;
  [key: string]: any;
};

export function sortByOrder<T extends HasOrder>(arr: T[]): T[] {
  return [...arr].sort((a, b) => {
    if (a.order === null && b.order === null) {
      return 0;
    }

    if (a.order === null) {
      return 1;
    }

    if (b.order === null) {
      return -1;
    }

    return a.order - b.order;
  });
}
