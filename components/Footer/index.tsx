"use client";
import dynamic from "next/dynamic";
import {RenderOnViewport} from "@/hooks/useLazyLoading";

const Footer = dynamic(() => import("./Footer"), {ssr: false})

export default (props: any) => {
    return (
        <RenderOnViewport>
            <Footer {...props} />
        </RenderOnViewport>
    )
};
