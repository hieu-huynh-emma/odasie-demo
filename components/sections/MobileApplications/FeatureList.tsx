'use client';

import DynamicIcon from '@/components/DynamicIcon';
import useBreakpoint from '@/hooks/useBreakPoint';
import { AppFeatureItem } from '@/types';

type FeatureListItemProps = {
  feature: AppFeatureItem;
};

function FeatureListItem({ feature }: FeatureListItemProps) {
  const { isMobile } = useBreakpoint();

  return (
    <div className="flex flex-col items-start gap-4 sm:flex-row">
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-secondary-500 p-2">
          <DynamicIcon
            name={feature.icon.name}
            size={16}
            className="h-6 w-6 text-white"
          />
        </div>
        {isMobile && (
          <h3 className="typo-sm-bold text-gray-900">{feature.title}</h3>
        )}
      </div>

      <div className="space-y-1">
        {!isMobile && (
          <h3 className="typo-sm-bold text-gray-900">{feature.title}</h3>
        )}
        {feature.items.length > 0 ? (
          <ul className="typo-sm-regular list-disc space-y-2 pl-4 text-gray-900">
            {feature.items.map((item, index) => (
              <li key={`feature-list-item-text-${index}`}>{item.text}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

type FeatureListProps = {
  features: AppFeatureItem[];
};

function FeatureList({ features }: FeatureListProps) {
  return (
    <div className="space-y-3">
      {features.map((feat, index) => (
        <FeatureListItem key={`feature-list-${index}`} feature={feat} />
      ))}
    </div>
  );
}

export default FeatureList;
