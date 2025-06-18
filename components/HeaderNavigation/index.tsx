"use client";
import dynamic from "next/dynamic";
import {RenderAfterLCP, RenderOnFirstInteraction} from "@/hooks/useLazyLoading";

const HeaderNavigation = dynamic(() => import("./HeaderNavigation"), {ssr: false})

export default (props: any) => {
  return (
      <RenderOnFirstInteraction>
        <HeaderNavigation {...props} />
      </RenderOnFirstInteraction>
  )
};
