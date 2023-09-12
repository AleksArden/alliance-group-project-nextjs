import Image from 'next/image';
import styles from './GalleryForm.module.scss';
import poster from 'public/posters/poster-not-found.jpg';

const GalleryForm = () => {
  return (
    <form>
      <label className={styles.label}>
        Назва сторінки
        <input
          className={styles.input}
          type="text"
          name="title"
          //   value={title}
          //   onChange={handleChange}
        />
      </label>
      <label className={styles.label}>
        Доповнення до назви
        <input
          className={styles.input}
          type="text"
          name="subtitle"
          //   value={subtitle}
          //   onChange={handleChange}
        />
      </label>

      <label className={styles.label}>
        Фонове зображення для комп&apos;ютерів
        <input
          className={styles.inputImage}
          type="file"
          name="backgroundImageDesktop"
          accept=".jpg, .jpeg, .png"
          //   onChange={handleChangePreview}
        />
        <div style={{ position: 'relative', width: '850px', height: '500px' }}>
          <Image
            className={styles.image}
            src={poster}
            fill
            alt="The background photo"
            priority
            style={{ objectFit: 'cover' }}
            sizes="100vw"
          />
        </div>
      </label>

      <label className={styles.label}>
        Фонове зображення для планшетів
        <input
          className={styles.inputImage}
          type="file"
          name="backgroundImageTablet"
          accept=".jpg, .jpeg, .png"
          //   onChange={handleChangePreview}
        />
        <div style={{ position: 'relative', width: '600px', height: '400px' }}>
          <Image
            className={styles.image}
            src={poster}
            fill
            sizes="100vw"
            alt="The background photo"
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
      </label>
      <label className={styles.label}>
        Фонове зображення для мобільних телефонів
        <input
          className={styles.inputImage}
          type="file"
          name="backgroundImageMobile"
          accept=".jpg, .jpeg, .png"
          //   onChange={handleChangePreview}
        />
        <div style={{ position: 'relative', width: '200px', height: '300px' }}>
          <Image
            className={styles.image}
            src={poster}
            fill
            sizes="100vw"
            alt="Alliance Group"
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
      </label>
    </form>
  );
};
export default GalleryForm;
