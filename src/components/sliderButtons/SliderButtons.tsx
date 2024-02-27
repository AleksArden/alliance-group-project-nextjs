import styles from './SliderButtons.module.scss';

interface IProps {
  onClick: (id: string) => void;
}

const SliderButtons = ({ onClick }: IProps) => {
  return (
    <div className="splide__arrows">
      <button
        type="button"
        className="splide__arrow splide__arrow--prev"
        onClick={() => onClick('-${1}')}
      >
        <div className={styles.iconPrev}></div>
      </button>
      <button
        className="splide__arrow splide__arrow--next"
        onClick={() => onClick('+${1}')}
      >
        <div className={styles.iconNext}></div>
      </button>
    </div>
  );
};
export default SliderButtons;
