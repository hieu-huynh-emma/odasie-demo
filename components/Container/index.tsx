import { cn } from '@/lib/utils';

type ContainerProps = React.PropsWithChildren<{
  className?: string;
  as?: React.ElementType;
}>;

function Container({
  className,
  children,
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component className={cn('container mx-auto px-2', className)}>
      {children}
    </Component>
  );
}

export default Container;
