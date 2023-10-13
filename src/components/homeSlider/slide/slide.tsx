'use client';
import { ReactNode } from 'react';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const Slide = ({ children }: { children: ReactNode }) => (
  <SplideSlide>{children}</SplideSlide>
);
export default Slide;
