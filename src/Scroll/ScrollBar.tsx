/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import useScrollBar from './hooks/useScrollBar';
import { getComponentRef } from "./utils"

export type ScrollBarProps = {
  barType?: 'x' | 'y';
  scrollElementRef?: any;

  trackColor?: string;
  trackStyle?: React.CSSProperties;
  trackProps?: any;
  trackRef?: any;

  thumbColor?: string;
  thumbStyle?: React.CSSProperties;
  thumbProps?: any;
  thumbRef?: any;
};

function ScrollBar(props: ScrollBarProps) {
  const {
    barType,
    scrollElementRef,

    trackColor,
    trackStyle: trackStyleProp,
    trackProps: trackPropsProp = {},
    trackRef: trackRefProp,

    thumbColor,
    thumbStyle: thumbStyleProp,
    thumbProps: thumbPropsProp = {},
    thumbRef: thumbRefProp,
  } = props;

  const { trackRef, thumbRef, thumbClient, thumbOffset, trackClient } = useScrollBar({
    scrollElementRef,
    barType,
  });

  const getThumbRef = getComponentRef([thumbRef, thumbRefProp]);

  const thumbDynamicStyle: any = React.useMemo(() => ({
    background: thumbColor || 'rgba(0, 0, 0, .5)',

    ...(barType === 'x' && {
      height: '100%',
      width: thumbClient,
      transform: `translate3d(${thumbOffset}px, 0px, 0px)`,
    }),

    ...(barType === 'y' && {
      width: '100%',
      height: thumbClient,
      transform: `translate3d(0px, ${thumbOffset}px, 0px)`,
    }),
  }), [
    thumbColor,
    thumbClient,
    thumbOffset,
    barType,
  ]);

  const thumbProps = {
    ref: getThumbRef,
    style: {
      cursor: 'pointer',
      userSelect: 'none',
      borderRadius: 4,
      ...thumbDynamicStyle,
      ...thumbPropsProp.style,
      ...thumbStyleProp,
    },
  }

  const renderThumb = <div {...thumbProps} />;

  const getTrackRef = getComponentRef([trackRef, trackRefProp]);

  const trackDynamicStyle: any = React.useMemo(() => ({
    background: trackColor || 'transparent',
    ...(barType === 'x' && { height: 10, width: trackClient, left: 0, bottom: 0 }),
    ...(barType === 'y' && { width: 10, height: trackClient, right: 0, top: 0, }),
  }), [trackClient, barType, trackColor]);

  const trackProps = {
    ...trackPropsProp,
    ref: getTrackRef,
    children: renderThumb,
    style: {
      userSelect: 'none',
      zIndex: 9999,
      position: 'absolute',
      ...trackDynamicStyle,
      ...trackPropsProp.style,
      ...trackStyleProp,
    }
  }

  const renderTrack = <div {...trackProps} />;

  return renderTrack;
}

export default ScrollBar;
