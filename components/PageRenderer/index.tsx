"use server";
import {
    CMSBlock,
} from '@/types';
import {TFunction} from 'i18next';
import {RenderOnViewport} from "@/hooks/useLazyLoading";
import SectionRenderer from "@/components/PageRenderer/SectionRenderer";

export type PageRendererProps = {
    url?: string;
    lang: string;
    blocks: CMSBlock[];
    queryParameters?: { [key: string]: string | string[] };
    t: TFunction<string[], string>;
    localizedSlugs?: { en: string; fr: string; de?: string };
    filterSlug?: { [key: string]: string };
};


async function PageRenderer(props: PageRendererProps) {
    const {
        blocks, url,
        lang,
        queryParameters,
        t,
        filterSlug,
    } = props;

    const renderedBlocks = await Promise.all(
        blocks.map(async block => {
            return (
                <RenderOnViewport key={`${block.__component}-${block.id}`}>
                    <SectionRenderer block={block} url={url} lang={lang} queryParameters={queryParameters} t={t}
                                     filterSlug={filterSlug}/>
                </RenderOnViewport>
            )
        }),
    );

    return renderedBlocks.filter(Boolean);
}

export default PageRenderer;
