import { InstagramDisplay as InstagramDisplayType } from '@/types';
import { InstagramIcon } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Link from 'next/link';

export default function InstagramDisplay({
  instagram,
}: {
  instagram: InstagramDisplayType;
}) {
  return (
    <div className="grid grid-cols-12 gap-4">
      {instagram.images.map(image => (
        <div key={image.id} className="col-span-6">
          <ImageWithFallback
            src={image.url}
            alt="Instagram image"
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ width: '100%', maxHeight: '275px' }}
            className="h-auto w-full rounded-sm lg:rounded-md"
          />
        </div>
      ))}
      <div className="col-span-12 flex flex-col items-center justify-center gap-2 py-6 lg:flex-row lg:justify-around">
        <div className="flex items-center space-x-4">
          {instagram.logo?.url && (
            <Link
              target="_blank"
              href={`https://www.instagram.com/${instagram.instagramTag}`}
              className="relative h-16 w-16 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 p-[2px]">
              <ImageWithFallback
                src={instagram.logo.url}
                alt="Odasie instagram"
                width={60}
                height={60}
                className="h-full w-full rounded-full bg-white object-cover p-0.5"
              />
            </Link>
          )}
          <div className="flex">
            {/* Username & handle */}
            <Link
              target="_blank"
              href={`https://www.instagram.com/${instagram.instagramTag}`}>
              <h2 className="text-lg font-semibold">
                {instagram.instagramName}
              </h2>
              <p className="text-sm text-gray-500">{instagram.instagramTag}</p>
            </Link>
          </div>

          {/* Stats & Follow */}

          <div className="text-center">
            <p className="font-semibold">{instagram.numberOfPosts}</p>
            <p className="text-xs text-gray-500">Posts</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">{instagram.numberOfFollowers}</p>
            <p className="text-xs text-gray-500">followers</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">{instagram.numberOfFollowing}</p>
            <p className="text-xs text-gray-500">following</p>
          </div>
        </div>

        {/* Follow button */}
        <Link
          target="_blank"
          href={`https://www.instagram.com/${instagram.instagramTag}`}
          className="flex max-w-[108px] items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium transition hover:bg-gray-50">
          <InstagramIcon />
          Follow
        </Link>
      </div>
    </div>
  );
}
