import React from 'react';
import type { ScrollBarXProps } from './ScrollBarX';
import type { ScrollBarYProps } from './ScrollBarY';
import type { ScrollContainerProps } from './ScrollContainer';
import type { ScrollElementProps } from './ScrollElement';

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

  const onScroll = (e: any) => {
    if (onScrollProp) {
      onScrollProp(e);
    }
  };

  const scrollContainerProps: ScrollContainerProps = {
    ...restProps,
    style: {
      position: 'relative',
      width: scroll && scroll.x,
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
    scrollElementRef,
    thumbColor: thumbXColor || thumbColor,
    trackColor: trackXColor || trackColor,
    thumbStyle: { ...thumbStyle, ...thumbXStyle },
    trackStyle: { ...trackStyle, ...trackXStyle },
    thumbProps: { ...thumbProps, ...thumbXProps },
    trackProps: { ...trackProps, ...trackXProps },
  };

  const scrollBarYProps: ScrollBarYProps = {
    scrollElementRef,
    thumbColor: thumbYColor || thumbColor,
    trackColor: trackYColor || trackColor,
    thumbStyle: { ...thumbStyle, ...thumbYStyle },
    trackStyle: { ...trackStyle, ...trackYStyle },
    thumbProps: { ...thumbProps, ...thumbYProps },
    trackProps: { ...trackProps, ...trackYProps },
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
