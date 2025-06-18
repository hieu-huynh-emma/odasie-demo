import {CMSBlock} from "@/types";
import {TFunction} from "i18next";

export type PageRendererProps = {
    url?: string;
    lang: string;
    blocks: CMSBlock[];
    queryParameters?: { [key: string]: string | string[] };
    localizedSlugs?: { en: string; fr: string; de?: string };
    filterSlug?: { [key: string]: string };
};
