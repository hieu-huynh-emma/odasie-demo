import {notFound} from 'next/navigation';

import PageRenderer from '@/components/PageRenderer';
import {getCmsPage} from '@/services';
import HeroSection from '@/components/sections/HeroSection';
import {HeroSection as HeroSectionType} from '@/types';

export default async function HomePage({
                                           params,
                                       }: Readonly<{ params: Promise<{ lang: string }> }>) {
    const {lang} = await params;

    const cmsPage = await getCmsPage('/', lang);

    if (!cmsPage || !cmsPage.data) {
        notFound();
    }

    return (
        <main className="mx-auto flex max-w-1200 flex-col pb-8 lg:pb-16">
            <HeroSection
                key={`${cmsPage.data.heroBlock.__component}-${cmsPage.data.heroBlock.id}`}
                lang={lang}
                url="/"
                section={cmsPage.data.heroBlock as HeroSectionType}
            />

            <PageRenderer url="/" lang={lang} blocks={cmsPage?.data?.blocks}/>
        </main>
    );
}
