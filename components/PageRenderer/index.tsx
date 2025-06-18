import {PageRendererProps} from "@/components/PageRenderer/types";
import {RenderOnViewport} from "@/hooks/useLazyLoading";
import {getCmsBlock} from "@/services";
import BlockRenderer from "@/components/PageRenderer/BlockRenderer";

async function PageRenderer(props: PageRendererProps) {
    const {
        blocks, ...rest
    } = props;

    const renderedBlocks = blocks.map(async block => {
        const cmsBlock = await getCmsBlock(block.id, block.__component);
        return (
            <RenderOnViewport key={block.key} height={500}>
                <BlockRenderer block={cmsBlock} {...rest}/>
            </RenderOnViewport>
        )
    });

    return renderedBlocks.filter(Boolean);
}


export default PageRenderer;
