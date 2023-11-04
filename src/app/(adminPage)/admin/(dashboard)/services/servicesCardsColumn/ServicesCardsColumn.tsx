'use client';

import { ServiceType } from 'types/dataTypeForFirebase';
import styles from './ServicesCardsColumn.module.scss';

import { useRouter, useSearchParams } from 'next/navigation';
import ProductModal from 'components/productsModal/ProductsModal';
import ServicesModal from 'components/servicesModal/ServicesModal';

interface IProps {
  data: ServiceType[];
}

const ServicesCardsColumn = ({ data }: IProps) => {
  const searchParams = useSearchParams();
  const showModal = searchParams.has('modal');

  const router = useRouter();

  return (
    <>
      <div className={styles.container}>
        <ul className={styles.list}>
          {/* {data.map(oneService => (
            <ProductCard key={oneProduct.productId} data={oneProduct} />
          ))} */}
        </ul>
        <button
          className={styles.button}
          onClick={() =>
            router.push('/admin/services/?modal=true', { scroll: false })
          }
        >
          Додати Продукцію
        </button>
      </div>
      {showModal && <ServicesModal btnName="Додати" />}
    </>
  );
};
export default ServicesCardsColumn;
