"use client";
import dynamic from "next/dynamic";
import {RenderAfterLCP} from "@/hooks/useLazyLoading";

const HeaderNavigation = dynamic(() => import("./HeaderNavigation"), {ssr: false})

export default (props: any) => {
  return (
      <RenderAfterLCP>
        <HeaderNavigation {...props} />
      </RenderAfterLCP>
  )
};
