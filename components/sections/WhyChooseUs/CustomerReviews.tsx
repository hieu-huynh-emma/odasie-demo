import Container from '@/components/Container';
import { CustomerReviewConfig } from '@/configs';
import { QueryMapper } from '@/lib/query-mapper';
import { getCustomerReviews } from '@/services';

import CarouselCustomerReview from './CarouselCustomerReview';

type CustomerReviewsProps = {
  lang: string;
  numberOfItems: number;
};

async function CustomerReviews({ lang, numberOfItems }: CustomerReviewsProps) {
  const queryMapper = new QueryMapper(CustomerReviewConfig);
  const criteria = queryMapper.fromUrl(
    new URLSearchParams(`?pageSize=${numberOfItems}`),
  );
  const res = await getCustomerReviews({ locale: lang, ...criteria });

  if (!res || !res.data) {
    return null;
  }

  return (
    <Container className="max-w-screen-sm">
      <CarouselCustomerReview reviews={res.data} />
    </Container>
  );
}

export default CustomerReviews;
