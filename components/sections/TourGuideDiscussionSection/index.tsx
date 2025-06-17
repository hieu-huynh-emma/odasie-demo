import Container from '@/components/Container';
import Section from '@/components/sections/Section';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Image as ImageType, TourGuide } from '@/types';
import Link from 'next/link';
import { TFunction } from 'i18next';

type Props = {
  tourGuideDiscussion: {
    bgImage: ImageType;
    quote: string;
    tourGuide: TourGuide;
  };
  t: TFunction<string[], string>;
};

function TourGuideDiscussionSection({ tourGuideDiscussion, t }: Props) {
  const bgImage = tourGuideDiscussion.bgImage;
  const tourGuide = tourGuideDiscussion.tourGuide;

  return (
    <Section>
      <Container>
        <div className="relative overflow-hidden rounded-sm py-14 lg:rounded-md">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${encodeURI(bgImage.url)})`,
            }}
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-2 flex w-full flex-col items-center gap-4">
            {tourGuide?.avatar?.url && (
              <Avatar className="h-24 w-24 border-2 border-white">
                <AvatarImage src={tourGuide.avatar.url} alt={tourGuide.name} />
                <AvatarFallback>{tourGuide.name}</AvatarFallback>
              </Avatar>
            )}

            <div className="space-y-6 text-center">
              <p className="typo-2xl-semibold mb-6 text-white">
                {t('common.more_question', { name: tourGuide.name })}
              </p>
              <p className="typo-md-regular text-white">
                &quot;{tourGuideDiscussion.quote}&quot;
              </p>
            </div>

            <Link
              href={`/create-your-itinerary`}
              title={`Plan a trip with ${tourGuide.name}`}>
              <Button variant="primary" size="lg">
                {t('common.plan_trip', { name: tourGuide.name })}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default TourGuideDiscussionSection;
