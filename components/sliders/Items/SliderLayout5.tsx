'use client';

import ImageWithFallback from '@/components/ui/ImageWithFallback';
import DynamicIcon from '@/components/DynamicIcon';
import Timeline from '@/components/Timeline';
import { FlexibleSliderDesign, Image as ImageType } from '@/types';

interface Props {
  slider: FlexibleSliderDesign;
}

const ImageWithDescription = ({
  image,
  name,
  description,
}: {
  image: ImageType | null;
  name: string;
  description: string;
}) => (
  <div className="flex w-full max-w-[220px] flex-col items-center justify-start gap-2 rounded-xl shadow-lg">
    {image && (
      <ImageWithFallback
        src={encodeURI(image.url)}
        alt={name || 'description'}
        className="h-[140px] w-full rounded-sm object-cover sm:h-[160px] lg:rounded-md"
        width={0}
        height={0}
        sizes="(max-width: 640px) 100vw, 160px"
        style={{ width: '100%', height: 'auto' }}
      />
    )}
    <p className="mt-2 text-left text-base font-normal text-white drop-shadow-lg">
      {description}
    </p>
  </div>
);

export default function SliderLayout5({ slider: { items, darkMode } }: Props) {
  const [item1, item2] = items;

  return (
    <div className="flex h-full w-full flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-8 lg:bg-cover lg:bg-center lg:bg-no-repeat">
      {/* Left: Title and description */}
      <div className="flex flex-col justify-start text-left lg:col-span-7">
        <div className="mb-2 flex items-center gap-2">
          {item1.icon && <DynamicIcon name={item1.icon.name} size={24} />}
          <span className="text-base font-bold uppercase tracking-wide drop-shadow-lg">
            {item1.name}
          </span>
        </div>
        {item1.title && (
          <div className="mb-4 text-2xl font-bold uppercase leading-tight drop-shadow-lg lg:text-3xl">
            {item1.title}
          </div>
        )}
        {item1.description && (
          <div className="mb-4 text-base drop-shadow-lg">
            {item1.description}
          </div>
        )}
        {item1.timeline && (
          <div className="pt-4">
            <Timeline timeline={item1.timeline} darkMode={darkMode} />
          </div>
        )}
      </div>
      {/* Right: Images with descriptions */}
      <div className="flex w-full flex-row items-start justify-start gap-4 lg:col-span-5 lg:justify-end">
        <ImageWithDescription
          image={item1.image}
          name={item1.name}
          description={item1.description}
        />
        <ImageWithDescription
          image={item2.image}
          name={item2.name}
          description={item2.description}
        />
      </div>
    </div>
  );
}
