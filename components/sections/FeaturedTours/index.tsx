import Link from 'next/link';

import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import Section from '@/components/sections/Section';
import {Button} from '@/components/ui/button';
import {TourConfig} from '@/configs';
import {QueryMapper} from '@/lib/query-mapper';
import {getTours} from '@/services';
import {TourSection} from '@/types';

import CarouselFeaturedTour from './CarouselFeaturedTour';
import {cn} from '@/lib/utils';

type FeaturedToursProps = {
    lang: string;
    section: TourSection;
    filterSlug?: { [key: string]: string };
};

function FeaturedTours({
                           lang,
                           section,
                           filterSlug,
                       }: FeaturedToursProps) {
    // const queryMapper = new QueryMapper(TourConfig);
    // const queryParams = { ...filterSlug, pageSize: `${section.numberOfItems}` };
    // const criteria = queryMapper.fromUrl(new URLSearchParams(queryParams));

    const tours = section?.tours;
    console.log("%c 1 --> Line: 32||index.tsx\n tours: ", "color:#f0f;", tours);

    if (!tours.length) {
        return null;
    }

    return (
        <Section
            bg={section.bgColor}
            className={cn(
                'tour-section ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] max-w-[100vw]',
                section.callToAction && 'pb-8 lg:pb-16',
            )}>

            <Container className="mx-auto max-w-[1200px]">
                <CarouselFeaturedTour tours={tours}/>
            </Container>
            {section.callToAction && (
                <div className="mt-12 flex justify-center">
                    <Link
                        href={section.callToAction.url}
                        title={section.callToAction.label}>
                        <Button variant="secondary" size="lg">
                            {section.callToAction.label}
                        </Button>
                    </Link>
                </div>
            )}
        </Section>
    );
}

export default FeaturedTours;
