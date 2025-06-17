import Container from '@/components/Container';
import HeroSection from '@/components/sections/HeroSection';
import { HeroSection as HeroSectionType } from '@/types';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default async function NotFound() {
  const section: HeroSectionType = {
    image: {
      id: Math.random() * 1000,
      url: '/images/placeholder/bg-not-found.jpg',
    },
    heading: {
      segments: [{ id: 1, text: '404', highlight: 'primary', newline: false }],
    },
    description: 'Feeling lost?',
  };

  return (
    <HeroSection lang="en" section={section}>
      <Container>
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="typo-md-semibold inline-flex items-center gap-2 text-white">
            <ChevronLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </Container>
    </HeroSection>
  );
}
