import Image from 'next/image';

import styles from './BackgroundImage.module.scss';
const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMl5aYCQACoAEtsgIm5QAAAABJRU5ErkJggg==`;

interface IProps {
  imageUrl: string;
}

const BackgroundImage = ({ imageUrl }: IProps) => (
  <div className={styles.wrapperImage}>
    <Image
      alt="Mountains"
      src={imageUrl}
      placeholder="blur"
      blurDataURL={rgbDataURL(95, 27, 24)}
      quality={80}
      fill
      sizes="100vw"
      style={{
        objectFit: 'cover',
      }}
    />
  </div>
);
export default BackgroundImage;