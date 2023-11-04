'use client';

import { ServiceType } from 'types/dataTypeForFirebase';
import styles from './ServicesCardsColumn.module.scss';

import { useRouter, useSearchParams } from 'next/navigation';

import ServicesModal from 'components/servicesModal/ServicesModal';
import { useEffect, useState } from 'react';

interface IProps {
  data: ServiceType[];
}

const ServicesCardsColumn = ({ data }: IProps) => {
  const [biggestId, setBiggestId] = useState(0);

  const searchParams = useSearchParams();
  const showModal = searchParams.has('modal');

  const router = useRouter();

  useEffect(() => {
    if (data) {
      let arrId: number[] = [];
      data.forEach(({ serviceId }) => {
        arrId.push(Number(serviceId));
      });
      arrId.sort((a, b) => b - a);

      setBiggestId(arrId[0]);
    }
  }, [data]);

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
      {showModal && <ServicesModal btnName="Додати" id={biggestId} />}
    </>
  );
};
export default ServicesCardsColumn;
