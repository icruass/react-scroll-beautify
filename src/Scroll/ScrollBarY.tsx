import React from 'react';
import type { ScrollBarProps } from './ScrollBar';

import ScrollBar from './ScrollBar';

export type ScrollBarYProps = Omit<ScrollBarProps, 'barType'> & {};

const ScrollBarY = (props: ScrollBarYProps) => <ScrollBar {...props} barType="y" />;

export default ScrollBarY;
