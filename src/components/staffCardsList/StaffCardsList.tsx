import { AddStaffTypeWithId } from 'types/dataTypeForFirebase';
import styles from './StaffCardsLIst.module.scss';
import Image from 'next/image';

interface IProps {
  data: AddStaffTypeWithId[];
}

const StaffCardsList = ({ data }: IProps) => {
  return (
    <ul>
      {data.map(
        ({
          id,
          photoStaff,
          name,
          position,
          description,
        }: AddStaffTypeWithId) => (
          <li key={id}>
            <div
              style={{
                position: 'relative',
                width: '280px',
                height: '280px',
              }}
            >
              <Image
                src={photoStaff}
                fill
                sizes="100vw"
                alt="The staff photo"
                priority
                style={{ objectFit: 'cover' }}
              />
            </div>
            <p>{name}</p>
            <p>{position}</p>
            <p>{description}</p>
          </li>
        )
      )}
    </ul>
  );
};
export default StaffCardsList;
