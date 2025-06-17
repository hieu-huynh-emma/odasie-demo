import { DOMPurifyServer } from '@/lib/dompurify';
import { cn } from '@/lib/utils';
import { TalkAboutUsCard } from '@/types';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface Props {
  card: TalkAboutUsCard;
}

const directionMapping = {
  row: 'flex-row',
  column: 'flex-col',
};

export default function Card({ card }: Props) {
  return (
    <div
      className={cn(
        'flex h-auto flex-col items-center justify-center gap-4 overflow-hidden rounded-b-md p-4 md:h-[400px] lg:h-[316px]',
        card.backgroundColor === 'white'
          ? 'bg-white'
          : card.backgroundColor === 'green'
            ? 'bg-[#34DFA1]'
            : 'bg-white',
        `md:${directionMapping[card.direction]}`,
      )}>
      <div
        className={cn(
          'h-full w-full',
          card.direction === 'row' ? 'flex-[2]' : 'h-1/3',
        )}>
        <ImageWithFallback
          src={card.image.url}
          alt="They talk about Odasie card"
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ width: '100%', height: '100%' }}
          className="object-contain"
        />
      </div>
      <div
        className={cn(
          'mx-auto',
          card.direction === 'row' ? 'flex-[3]' : 'h-2/3',
        )}
        dangerouslySetInnerHTML={{
          __html: DOMPurifyServer.sanitize(card.text),
        }}
      />
    </div>
  );
}
