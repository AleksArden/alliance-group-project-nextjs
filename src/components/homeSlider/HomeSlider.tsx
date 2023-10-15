'use client';
import { Splide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Slide from './slide/slide';

const HomeSlider = () => (
  <Splide
    options={{
      direction: 'ttb',
      height: '10rem',
      wheel: true,
    }}
  ></Splide>
);
export default HomeSlider;
