import Rating from '@/components/Rating';
import { Tour } from '@/types';
import CarouselTourGallery from './CarouselTourGallery';
import Link from 'next/link';
import { TFunction } from 'i18next';
import Container from '@/components/Container';

type TourHeroSectionProps = {
  tour: Tour;
  t: TFunction<string[], string>;
};

function TourHeroSection({ tour, t }: TourHeroSectionProps) {
  const totalReviews = tour.reviewsStats.totalReviews ?? 0;
  return (
    <div className="h-full w-full">
      <div className="via-white-300 absolute bottom-0 h-[calc(100%-70px)] w-full bg-gradient-to-t from-black/75 to-transparent" />
      <Container className="relative mx-auto flex max-w-1200 justify-center overflow-hidden">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 flex flex-col justify-center space-y-6 lg:col-span-5">
            <div className="typo-base-regular flex flex-row gap-2">
              <Link
                href={`/destination/${tour.country?.slug}`}
                title={tour.country?.name}>
                <span className="text-primary-500">{tour.country?.name}</span>
              </Link>
              <span>/</span>
              <span>{tour.title}</span>
            </div>
            <h2 className="typo-5xl-bold">{tour.title}</h2>
            {totalReviews > 0 && (
              <div className="flex flex-col gap-1">
                <div className="flex flex-row items-center gap-2">
                  <span className="typo-lg-semibold">{tour.rating} / 5</span>
                  <Rating halfIncrement value={tour.rating} />
                </div>
                <span>
                  (
                  {t(
                    `common.total_reviews${totalReviews > 1 ? '_plural' : ''}`,
                    {
                      total: tour.reviewsStats.totalReviews,
                    },
                  )}
                  )
                </span>
              </div>
            )}
            <p className="typo-lg-regular">{tour.description}</p>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <CarouselTourGallery gallery={tour.gallery} />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default TourHeroSection;
