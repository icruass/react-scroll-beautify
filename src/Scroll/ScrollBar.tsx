/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import useScrollBar from './hooks/useScrollBar';

export type ScrollBarProps = {
  disabled?: boolean;
  barType?: 'x' | 'y';
  transition?: string;

  thumbColor?: string;
  thumbStyle?: React.CSSProperties;
  thumbProps?: any;
  thumbRef?: any;
  thumbClient?: number | string;
  thumbOffset?: number | string;

  trackColor?: string;
  trackStyle?: React.CSSProperties;
  trackProps?: any;
  trackRef?: any;

  onThumbMove?: any;
  onTrackClick?: any;

  scrollElementRef?: any;
};

function ScrollBar(props: ScrollBarProps) {
  const {
    disabled,
    barType,
    transition,

    thumbColor,
    thumbStyle: thumbStyleProp,
    thumbProps = {},
    thumbRef: thumbRefProp,

    trackColor,
    trackStyle: trackStyleProp,
    trackProps = {},
    trackRef: trackRefProp,

    onThumbMove: onThumbMoveProp,
    onTrackClick: onTrackClickProp,
    scrollElementRef,
  } = props;

  const { trackRef, thumbRef, thumbClient, thumbOffset, trackClient } = useScrollBar({
    scrollElementRef,
    barType,
  });

  const mouseDownMoveRef = React.useRef<any>(null);

  const getTrackRef = (i: any) => {
    trackRef.current = i;
    if (typeof trackRefProp === 'function') {
      trackRefProp(i);
    } else if (trackRefProp && 'current' in trackRefProp) {
      trackRefProp.current = i;
    }
  };

  const getThumbRef = (i: any) => {
    thumbRef.current = i;
    if (typeof thumbRefProp === 'function') {
      thumbRefProp(i);
    } else if (thumbRefProp && 'current' in thumbRefProp) {
      thumbRefProp.current = i;
    }
  };

  const trackStyle: any = React.useMemo(() => {
    return {
      background: 'transparent',
      ...(barType === 'x' && { height: 10 }),
      ...(barType === 'y' && { width: 10 }),
      zIndex: 9999,
      ...trackProps.style,
      ...trackStyleProp,
      ...(trackColor && { background: trackColor }),
      position: 'absolute',
      userSelect: 'none',
      ...(barType === 'x' && { left: 0, bottom: 0, width: '100%' }),
      ...(barType === 'y' && { top: 0, right: 0, height: '100%' }),
      ...(disabled && { display: 'none' }),
    };
  }, [trackStyleProp, trackProps.style, barType, disabled]);

  const thumbStyle: any = React.useMemo(() => {
    return {
      background: 'rgba(0, 0, 0, .5)',
      cursor: 'pointer',
      userSelect: 'none',
      borderRadius: 4,
      ...(barType === 'x' && { height: '100%' }),
      ...(barType === 'y' && { width: '100%' }),
      transition: `transform ${transition}`,
      ...thumbProps.style,
      ...thumbStyleProp,
      ...(thumbColor && { background: thumbColor }),
      ...(barType === 'x' && {
        width: thumbClient,
        transform: `translate3d(${thumbOffset}px, 0px, 0px)`,
      }),
      ...(barType === 'y' && {
        height: thumbClient,
        transform: `translate3d(0px, ${thumbOffset}px, 0px)`,
      }),
      ...(mouseDownMoveRef.current && { transition: 'none' }),
    };
  }, [
    thumbStyleProp,
    thumbProps.style,
    thumbClient,
    thumbOffset,
    mouseDownMoveRef.current,
    barType,
    transition,
  ]);

  const onTrackClick = (e: any) => {
    const clickClientX = e.clientX;
    const clickClientY = e.clientY;
    const thumbClientRect = thumbRef.current.getBoundingClientRect();
    const thumbClientX = thumbClientRect.left;
    const thumbClientY = thumbClientRect.top;

    const thumbOffsetX = clickClientX - thumbClientX;
    const thumbOffsetY = clickClientY - thumbClientY;

    if (onTrackClickProp) {
      onTrackClickProp(e, { thumbOffsetX, thumbOffsetY });
    }
    if (trackProps.onClick) {
      trackProps.onClick(e);
    }
  };

  const onThumbClick = (e: any) => {
    e.stopPropagation();

    if (thumbProps.onClick) {
      thumbProps.onClick(e);
    }
  };

  const onThumbMove = (moveEvent: any) => {
    const downEvent = mouseDownMoveRef.current;
    if (!downEvent) return document.removeEventListener('mousemove', onThumbMove);
    if (!downEvent) return document.removeEventListener('touchmove', onThumbMove);

    const downMousePosition =
      downEvent.targetTouches && downEvent.targetTouches[0]
        ? { x: downEvent.targetTouches[0].pageX, y: downEvent.targetTouches[0].pageY }
        : { x: downEvent.x, y: downEvent.y };
    const moveMousePosition =
      moveEvent.targetTouches && moveEvent.targetTouches[0]
        ? { x: moveEvent.targetTouches[0].pageX, y: moveEvent.targetTouches[0].pageY }
        : { x: moveEvent.x, y: moveEvent.y };
    const offsetY = moveMousePosition.y - downMousePosition.y;
    const offsetX = moveMousePosition.x - downMousePosition.x;

    if (onThumbMoveProp) {
      onThumbMoveProp(moveEvent, { downEvent, offsetY, offsetX });
    }
  };

  const onThumbMouseDown = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    mouseDownMoveRef.current = e;
    document.addEventListener('mousemove', onThumbMove);
    document.documentElement.addEventListener('touchmove', onThumbMove);
  };

  const onDocumentMouseUp = () => {
    mouseDownMoveRef.current = null;
  };

  React.useEffect(() => {
    if (thumbRef.current) {
      thumbRef.current.addEventListener('mousedown', onThumbMouseDown);
      thumbRef.current.addEventListener('touchstart', onThumbMouseDown);
    }
    return () => {
      if (thumbRef.current) {
        thumbRef.current.removeEventListener('mousedown', onThumbMouseDown);
        thumbRef.current.removeEventListener('touchstart', onThumbMouseDown);
      }
    };
  }, [onThumbMouseDown]);

  React.useEffect(() => {
    document.addEventListener('mouseup', onDocumentMouseUp);
    document.addEventListener('touchend', onDocumentMouseUp);
    return () => {
      document.removeEventListener('mouseup', onDocumentMouseUp);
      document.removeEventListener('touchend', onDocumentMouseUp);
    };
  }, [onDocumentMouseUp]);

  return (
    <div ref={getTrackRef} style={trackStyle} {...trackProps} onClick={onTrackClick}>
      <div ref={getThumbRef} style={thumbStyle} {...thumbProps} onClick={onThumbClick} />
    </div>
  );
}

export default ScrollBar;
