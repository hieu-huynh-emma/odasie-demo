import ImageWithFallback from '@/components/ui/ImageWithFallback';
import React from 'react';

const FeatureIcon = ({ included }: { included: boolean }) => (
  <ImageWithFallback
    src={
      included
        ? '/images/icons/insurance-icons/CheckFat.svg'
        : '/images/icons/insurance-icons/Prohibit.svg'
    }
    alt={included ? 'Included' : 'Not included'}
    width={70}
    height={70}
    className="inline-block h-5 w-5"
  />
);

export default FeatureIcon;
