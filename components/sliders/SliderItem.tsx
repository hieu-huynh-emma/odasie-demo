'use client';

import DynamicIcon from '@/components/DynamicIcon';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface Props {
  slider: any;
}

export default function SliderItem({
  slider: { name, icon, title, storyLabel, story, storyImage },
}: Props) {
  return (
    <div
      className="w-full rounded-sm bg-cover bg-top bg-no-repeat p-10 lg:h-[580px] lg:rounded-md"
      style={{
        backgroundImage: `url("https://media-staging.odasie.com/Image1_e12c3b3f5a.webp")`,
      }}>
      <div className="grid gap-4 text-white sm:grid-cols-6 lg:grid-cols-12">
        <div className="md: col-span-6 font-bold sm:pr-10 md:pr-10 lg:pr-20">
          <div>
            {icon && <DynamicIcon name={icon.name} size={24} />}
            <span>{name}</span>
          </div>
          <p className="pt-4 font-bold uppercase lg:text-4xl">{title}</p>
        </div>
        <div className="col-span-6 lg:pl-20">
          <span>{storyLabel}</span>
          <p className="py-4">{story}</p>
          {storyImage && (
            <ImageWithFallback
              src={storyImage}
              alt={name}
              className="bg-fi max-h-[319px] rounded-sm bg-top bg-no-repeat object-cover lg:rounded-md"
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ width: '100%', height: 'auto' }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
