import useResponsiveImage from '@/hooks/useResponsiveImage';
import { Image as ImageType } from '@/types';
import { getSizesByContainerWidth } from '@/utils/imageUtils';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

const SliderWithArrowImage = ({
  image,
  title,
}: {
  image: ImageType;
  title: string;
  i: number;
  currentSlide: number;
}) => {
  const imageUrl = useResponsiveImage(image, {
    defaultBreakpoint: 'ml',
  });
  return (
    <ImageWithFallback
      src={imageUrl}
      alt={title}
      sizes={getSizesByContainerWidth('full')}
      className="rounded-sm object-cover lg:rounded-md"
      loading={'eager'}
      priority={true}
      width={0}
      height={0}
      style={{
        width: '100%',
        height: '100%',
      }}
      fill
    />
  );
};

export default SliderWithArrowImage;
