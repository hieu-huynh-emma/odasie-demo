'use client';
import { Button } from '@/components/ui/button';

type ScrollToTargetButtonProps = React.PropsWithChildren<{
  targetSelector: string;
}>;

function ScrollToTargetButton({
  targetSelector,
  children,
}: ScrollToTargetButtonProps) {
  const handleClick = () => {
    const contentBlockElm = document.querySelector(targetSelector);
    if (contentBlockElm) {
      const rect = contentBlockElm.getBoundingClientRect();
      window.scrollTo({
        top: rect.top + window.scrollY - 100,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Button onClick={handleClick} variant="primary" size="md">
      {children}
    </Button>
  );
}

export default ScrollToTargetButton;
