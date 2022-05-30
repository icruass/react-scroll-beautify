import React from 'react';
import type { ScrollBarProps } from './ScrollBar';

import ScrollBar from './ScrollBar';

export type ScrollBarXProps = Omit<ScrollBarProps, 'barType'> & {};

const ScrollBarX = (props: ScrollBarXProps) => <ScrollBar {...props} barType="x" />;

export default ScrollBarX;
