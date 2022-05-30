import React from 'react';
import type { ScrollBarXProps } from './ScrollBarX';
import type { ScrollBarYProps } from './ScrollBarY';
import type { ScrollContainerProps } from './ScrollContainer';
import type { ScrollElementProps } from './ScrollElement';

import {
  getScrollXThumbWidth,
  getScrollYThumbHeight,
  getScrollXThumbOffset,
  getScrollYThumbOffset,
  getScrollTopRange,
  getScrollLeftRange,
  getScrollTopByThumbOffset,
  getScrollLeftByThumbOffset,
  getAgentIsMobile,
} from './utils';

import useSize from './hooks/useSize';

import ScrollContainer from './ScrollContainer';
import ScrollElement from './ScrollElement';
import ScrollBarX from './ScrollBarX';
import ScrollBarY from './ScrollBarY';

export type ScrollProps = React.HTMLAttributes<any> & {
  scroll?: { x?: number | string; y?: number | string };
  rollback?: boolean;
  scrollReverse?: boolean;
  transition?: string;
  disableScrollXBar?: boolean;
  disableScrollYBar?: boolean;
  thumbColor?: string;
  thumbXColor?: string;
  thumbYColor?: string;
  thumbStyle?: React.CSSProperties;
  thumbXStyle?: React.CSSProperties;
  thumbYStyle?: React.CSSProperties;
  thumbProps?: React.HTMLAttributes<HTMLDivElement>;
  thumbXProps?: React.HTMLAttributes<HTMLDivElement>;
  thumbYProps?: React.HTMLAttributes<HTMLDivElement>;

  trackColor?: string;
  trackXColor?: string;
  trackYColor?: string;
  trackStyle?: React.CSSProperties;
  trackXStyle?: React.CSSProperties;
  trackYStyle?: React.CSSProperties;
  trackProps?: React.HTMLAttributes<HTMLDivElement>;
  trackXProps?: React.HTMLAttributes<HTMLDivElement>;
  trackYProps?: React.HTMLAttributes<HTMLDivElement>;
};

function Scroll(props: ScrollProps, ref: React.Ref<any>) {
  const {
    rollback,
    scroll,
    scrollReverse,
    transition = '0.33s cubic-bezier(.51,.97,.58,.85)',
    disableScrollYBar,
    disableScrollXBar,

    children,
    style: styleProp,
    onScroll: onScrollProp,

    thumbColor,
    thumbXColor,
    thumbYColor,
    thumbStyle,
    thumbXStyle,
    thumbYStyle,
    thumbProps,
    thumbXProps,
    thumbYProps,

    trackColor,
    trackXColor,
    trackYColor,
    trackStyle,
    trackXStyle,
    trackYStyle,
    trackProps,
    trackXProps,
    trackYProps,
    ...restProps
  } = props;

  const { x: scrollX = '100%', y: scrollY = '100%' } = scroll || {};

  const scrollContainerRef = React.useRef(null);
  const getScrollContainerRef = i => {
    scrollContainerRef.current = i;
    if (typeof ref === 'function') {
      ref(i);
    }
    if (ref && 'current' in ref) {
      (ref as any).current = i;
    }
  };
  const scrollElementRef = React.useRef(null);
  const getScrollElementRef = i => {
    scrollElementRef.current = i;
  };

  const scrollElementSize = useSize(scrollElementRef);

  const [scrollXThumb, setScrollXThumb] = React.useState({ client: 0, offset: 0 });
  const [scrollYThumb, setScrollYThumb] = React.useState({ client: 0, offset: 0 });

  const [scrollTop, setScrollTop] = React.useState(0);
  const scrollTopStateRef = React.useRef(scrollTop);

  const [scrollLeft, setScrollLeft] = React.useState(0);
  const scrollLeftStateRef = React.useRef(scrollLeft);

  // 函数更新 `横向滚动条滑块` 长度和位置
  const onScrollXThumbChange = (newValue: any) => {
    const newScrollXThumb = { ...scrollXThumb, ...newValue };
    setScrollXThumb(newScrollXThumb);
  };

  // 函数更新 `纵向滚动条滑块` 长度和位置
  const onScrollYThumbChange = (newValue: any) => {
    const newScrollYThumb = { ...scrollYThumb, ...newValue };
    setScrollYThumb(newScrollYThumb);
  };

  // 获取 `横向滚动条滑块` 长度和位置并更新
  const updateScrollXThumb = () => {
    if (!scrollElementRef.current) return;
    const scrollXThumbWidth = getScrollXThumbWidth(scrollElementRef.current);
    const scrollXThumbOffset = getScrollXThumbOffset(
      scrollElementRef.current,
      scrollLeftStateRef.current,
    );

    onScrollXThumbChange({ client: scrollXThumbWidth, offset: scrollXThumbOffset });
  };

  // 获取 `纵向滚动条滑块` 长度和位置并更新
  const updateScrollYThumb = () => {
    if (!scrollElementRef.current) return;
    const scrollYThumbHeight = getScrollYThumbHeight(scrollElementRef.current);
    const scrollYThumbOffset = getScrollYThumbOffset(
      scrollElementRef.current,
      scrollTopStateRef.current,
    );
    onScrollYThumbChange({ client: scrollYThumbHeight, offset: scrollYThumbOffset });
  };

  // 函数更新 scroll top
  const onScrollTopChange = (newScrollTop: any) => {
    if (!scrollElementRef.current) return;
    const [minScrollTop, maxScrollTop] = getScrollTopRange(scrollElementRef.current);

    const newScrollTopRangeLimit =
      newScrollTop <= minScrollTop
        ? minScrollTop
        : newScrollTop >= maxScrollTop
        ? maxScrollTop
        : newScrollTop;

    setScrollTop(newScrollTopRangeLimit);
    scrollTopStateRef.current = newScrollTopRangeLimit;
    scrollElementRef.current.scrollTop = newScrollTopRangeLimit;
    updateScrollYThumb();
  };

  // 函数更新 scroll left
  const onScrollLeftChange = (newScrollLeft: any) => {
    if (!scrollElementRef.current) return;
    const [minScrollLeft, maxScrollLeft] = getScrollLeftRange(scrollElementRef.current);

    const newScrollLeftRangeLimit =
      newScrollLeft <= minScrollLeft
        ? minScrollLeft
        : newScrollLeft >= maxScrollLeft
        ? maxScrollLeft
        : newScrollLeft;

    setScrollLeft(newScrollLeftRangeLimit);
    scrollLeftStateRef.current = newScrollLeftRangeLimit;
    scrollElementRef.current.scrollLeft = newScrollLeftRangeLimit;
    updateScrollXThumb();
  };

  const onScroll = (e: any) => {
    const eventScrollTop = e.currentTarget.scrollTop;
    onScrollTopChange(eventScrollTop);

    if (onScrollProp) {
      onScrollProp(e);
    }
  };

  const onScrollYThumbMove = (e, { offsetY }: any) => {
    const newScrollYThumbOffset = scrollYThumb.offset + offsetY;
    const newScrollTop = getScrollTopByThumbOffset(scrollElementRef.current, newScrollYThumbOffset);

    onScrollTopChange(newScrollTop);
  };

  const onScrollXThumbMove = (e, { offsetX }: any) => {
    const newScrollXThumbOffset = scrollXThumb.offset + offsetX;
    const newScrollLeft = getScrollLeftByThumbOffset(
      scrollElementRef.current,
      newScrollXThumbOffset,
    );

    onScrollLeftChange(newScrollLeft);
  };

  const onScrollXTrackClick = (e: any, { thumbOffsetX }: any) => {
    const scrollXThumbWidth = getScrollXThumbWidth(scrollElementRef.current);
    const offsetX = scrollXThumbWidth * (thumbOffsetX > 0 ? 1 : -1) * 0.8;
    const newScrollXThumbOffset = scrollXThumb.offset + offsetX;
    const newScrollLeft = getScrollLeftByThumbOffset(
      scrollElementRef.current,
      newScrollXThumbOffset,
    );
    onScrollLeftChange(newScrollLeft);
  };

  const onScrollYTrackClick = (e: any, { thumbOffsetX }: any) => {
    const scrollYThumbHeight = getScrollYThumbHeight(scrollElementRef.current);
    const offsetY = scrollYThumbHeight * (thumbOffsetX > 0 ? 1 : -1) * 0.8;
    const newScrollYThumbOffset = scrollYThumb.offset + offsetY;
    const newScrollTop = getScrollTopByThumbOffset(scrollElementRef.current, newScrollYThumbOffset);
    onScrollTopChange(newScrollTop);
  };

  // 初始化滚动条滑块的长度和位置
  React.useLayoutEffect(() => {
    onScrollTopChange(scrollTop);
    onScrollLeftChange(scrollLeft);
  }, []);

  const scrollContainerProps: ScrollContainerProps = {
    ...restProps,
    style: {
      position: 'relative',
      width: scrollX,
      height: scroll && scroll.y !== undefined ? scroll.y : scrollElementSize.clientHeight,
      ...styleProp,
      overflow: 'hidden',
      padding: 0,
    },
  };

  const scrollElementProps: ScrollElementProps = {
    ref: getScrollElementRef,
    onScroll,
    style: {
      padding: 0,
      border: 'none',
      width: 'calc(100% + 17px)',
      height: 'calc(100% + 17px)',
      overflow: 'scroll',
    },
  };

  const scrollBarXProps: ScrollBarXProps = {
    transition,
    thumbClient: scrollXThumb.client,
    thumbOffset: scrollXThumb.offset,
    disabled: scrollXThumb.client === 0 || disableScrollXBar === true,

    thumbColor: thumbXColor || thumbColor,
    trackColor: trackXColor || trackColor,
    thumbStyle: { ...thumbStyle, ...thumbXStyle },
    trackStyle: { ...trackStyle, ...trackXStyle },
    thumbProps: { ...thumbProps, ...thumbXProps },
    trackProps: { ...trackProps, ...trackXProps },

    onThumbMove: onScrollXThumbMove,
    onTrackClick: onScrollXTrackClick,
  };

  const scrollBarYProps: ScrollBarYProps = {
    transition,
    thumbClient: scrollYThumb.client,
    thumbOffset: scrollYThumb.offset,
    disabled: scrollYThumb.client === 0 || disableScrollYBar === true,

    thumbColor: thumbYColor || thumbColor,
    trackColor: trackYColor || trackColor,
    thumbStyle: { ...thumbStyle, ...thumbYStyle },
    trackStyle: { ...trackStyle, ...trackYStyle },
    thumbProps: { ...thumbProps, ...thumbYProps },
    trackProps: { ...trackProps, ...trackYProps },

    onThumbMove: onScrollYThumbMove,
    onTrackClick: onScrollYTrackClick,
  };

  if (rollback) {
    const rollbackStyle = {
      overflow: 'auto',
      ...props.style,
    };
    return (
      <ScrollContainer
        ref={getScrollContainerRef}
        {...props}
        style={rollbackStyle}
        onScroll={onScroll}
      >
        {children}
      </ScrollContainer>
    );
  }

  return (
    <ScrollContainer ref={getScrollContainerRef} {...scrollContainerProps}>
      <ScrollElement {...scrollElementProps}>{children}</ScrollElement>
      <ScrollBarX {...scrollBarXProps} />
      <ScrollBarY {...scrollBarYProps} />
    </ScrollContainer>
  );
}

export default React.forwardRef(Scroll);
