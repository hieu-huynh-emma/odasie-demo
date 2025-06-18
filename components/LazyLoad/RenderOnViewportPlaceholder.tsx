import {Spinner} from "@/components/ui/spinner";
import React from "react";

export default function RenderOnViewportPlaceholder(props: any) {
    return (
        <div {...props} className="flex items-center justify-center bg-[#FFFFFF] bg-opacity-50 h-35">
            <Spinner/>
        </div>
    )
}
