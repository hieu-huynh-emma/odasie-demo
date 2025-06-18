import {Spinner} from "@/components/ui/spinner";
import React from "react";

export default function RenderOnViewportPlaceholder({height = 200, ...rest}) {
    return (
        <div {...rest} className="flex items-center justify-center bg-[#FFFFFF] bg-opacity-50" style={{height}}>
            <Spinner/>
        </div>
    )
}
