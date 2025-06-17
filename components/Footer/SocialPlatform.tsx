'use client';

import Link from 'next/link';
import DynamicIcon from '@/components/DynamicIcon';
import { Button } from '@/components/ui/button';
import { trackClickSocialIcon } from '@/lib/tracking'; // 🛑 import the tracker!
import { SocialLink } from '@/types';

type SocialPlatformProps = SocialLink;

function SocialPlatform({ url, platform, icon }: SocialPlatformProps) {
  const handleClick = () => {
    trackClickSocialIcon(platform); // 🛑 track the click before navigating away
  };

  return (
    <li className="">
      <Link href={url} title={platform} target="_blank" onClick={handleClick}>
        <Button variant="secondary" size="sm" iconOnly>
          <DynamicIcon name={icon.name} size={16} />
        </Button>
      </Link>
    </li>
  );
}

export default SocialPlatform;
