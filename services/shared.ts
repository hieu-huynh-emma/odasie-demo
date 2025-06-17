export function cmsPageUrlTransform(
  url: string,
  queryParameters: { [key: string]: string | string[] },
): string {
  if (url === 'create-your-itinerary' && queryParameters?.tourSlug) {
    return 'create-your-itinerary-with-tour';
  }
  return url;
}
