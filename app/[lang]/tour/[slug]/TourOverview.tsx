import { DOMPurifyServer } from '@/lib/dompurify';
import { Tour } from '@/types';

type TourOverviewProps = {
  tour: Tour;
};

function TourOverview({ tour }: TourOverviewProps) {
  if (!tour.overview) {
    return null;
  }

  return (
    <div
      className="prose max-w-full"
      dangerouslySetInnerHTML={{
        __html: DOMPurifyServer.sanitize(tour.overview),
      }}
    />
  );
}

export default TourOverview;
