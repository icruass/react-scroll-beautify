/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import useResizeCallback from '../hooks/useResizeCallback';

import {
  getScrollXThumbWidth,
  getScrollYThumbHeight,
  getScrollXThumbOffset,
  getScrollYThumbOffset,
  getScrollTopByThumbOffset,
  getScrollLeftByThumbOffset,
} from '../utils';

export type UseScrollBarOptions = {
  barType?: 'x' | 'y';
  scrollElementRef?: any;
  scrollLeft?: number;
  scrollTop?: number;
};

export type UseScrollBarResult = {
  trackClient: number;
  thumbClient: number;
  thumbOffset: number;
  updateThumbOffset: () => void;
  updateTrackClient: () => void;
  updateThumbClient: () => void;
  trackRef: any;
  thumbRef: any;
};

function useScrollBar(options: UseScrollBarOptions): UseScrollBarResult {
  const { barType } = options;
  const scrollElementRef = options.scrollElementRef ? options.scrollElementRef : { current: null };

  const trackRef = React.useRef<any>();
  const thumbRef = React.useRef<any>();
  const thumbMouseDownEventRef = React.useRef<any>();
  const thumbMouseDownStateRef = React.useRef<any>({});

  const [trackClient, setTrackClient] = React.useState(0);
  const [thumbClient, setThumbClient] = React.useState(0);
  const [thumbOffset, setThumbOffset] = React.useState(0);

  const latestStateRef = React.useRef({
    trackClient,
    thumbClient,
    thumbOffset,
  });
  latestStateRef.current = {
    trackClient,
    thumbClient,
    thumbOffset,
  };

  const updateTrackClient = () => {
    if (!scrollElementRef.current) return;
    const { clientWidth, clientHeight } = scrollElementRef.current;

    const client = barType === 'x' ? clientWidth : barType === 'y' ? clientHeight : 0;
    setTrackClient(client);
  };

  const updateThumbClient = () => {
    if (!scrollElementRef.current) return;
    const client =
      barType === 'x'
        ? getScrollXThumbWidth(scrollElementRef.current)
        : barType === 'y'
        ? getScrollYThumbHeight(scrollElementRef.current)
        : 0;
    setThumbClient(client);
  };

  const updateThumbOffset = () => {
    if (!scrollElementRef.current) return;
    const { scrollTop, scrollLeft } = scrollElementRef.current;
    const scrollLeftOrTop = barType === 'x' ? scrollLeft : barType === 'y' ? scrollTop : 0;
    const offset =
      barType === 'x'
        ? getScrollXThumbOffset(scrollElementRef.current, scrollLeftOrTop)
        : barType === 'y'
        ? getScrollYThumbOffset(scrollElementRef.current, scrollLeftOrTop)
        : 0;
    setThumbOffset(offset);
  };

  const onScroll = () => {
    updateThumbOffset();
  };

  const onTrackClick = (e: any) => {
    const clickClientX = e.clientX;
    const clickClientY = e.clientY;
    const thumbClientRect = thumbRef.current.getBoundingClientRect();
    const thumbClientX = thumbClientRect.left;
    const thumbClientY = thumbClientRect.top;

    const thumbOffsetX = clickClientX - thumbClientX;
    const thumbOffsetY = clickClientY - thumbClientY;

    if (barType == 'x' && scrollElementRef.current) {
      const newThumbOffset =
        latestStateRef.current.thumbOffset +
        latestStateRef.current.thumbClient * (thumbOffsetX > 0 ? 1 : -1);
      const newScrollLeft = getScrollLeftByThumbOffset(scrollElementRef.current, newThumbOffset);
      scrollElementRef.current.scrollLeft = newScrollLeft;
    }

    if (barType == 'y' && scrollElementRef.current) {
      const newThumbOffset =
        latestStateRef.current.thumbOffset +
        latestStateRef.current.thumbClient * (thumbOffsetY > 0 ? 1 : -1);
      const newScrollTop = getScrollTopByThumbOffset(scrollElementRef.current, newThumbOffset);
      scrollElementRef.current.scrollTop = newScrollTop;
    }
  };

  const onThumbMove = (moveEvent: any) => {
    const downEvent = thumbMouseDownEventRef.current;
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

    if (barType == 'x' && scrollElementRef.current) {
      const newThumbOffset = thumbMouseDownStateRef.current.thumbOffset + offsetX;
      const newScrollLeft = getScrollLeftByThumbOffset(scrollElementRef.current, newThumbOffset);
      scrollElementRef.current.scrollLeft = newScrollLeft;
    }

    if (barType == 'y' && scrollElementRef.current) {
      const newThumbOffset = thumbMouseDownStateRef.current.thumbOffset + offsetY;
      const newScrollTop = getScrollTopByThumbOffset(scrollElementRef.current, newThumbOffset);
      scrollElementRef.current.scrollTop = newScrollTop;
    }
  };

  const onThumbMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    thumbMouseDownEventRef.current = e;
    thumbMouseDownStateRef.current = { ...latestStateRef.current };
    document.addEventListener('mousemove', onThumbMove);
    document.documentElement.addEventListener('touchmove', onThumbMove);
  };

  const onThumbMouseup = () => {
    thumbMouseDownEventRef.current = null;
    thumbMouseDownStateRef.current = {};
    document.removeEventListener('mousemove', onThumbMove);
    document.removeEventListener('touchmove', onThumbMove);
  };

  const onDocumentMouseUp = () => {
    thumbMouseDownEventRef.current = null;
    thumbMouseDownStateRef.current = {};
    document.removeEventListener('mousemove', onThumbMove);
    document.removeEventListener('touchmove', onThumbMove);
  };

  React.useLayoutEffect(() => {
    if (!scrollElementRef.current) return;
    updateTrackClient();
    updateThumbClient();
    updateThumbOffset();
  }, [scrollElementRef.current]);

  useResizeCallback(scrollElementRef, () => {
    updateTrackClient();
    updateThumbClient();
    updateThumbOffset();
  });

  React.useLayoutEffect(() => {
    if (!scrollElementRef.current) return;
    scrollElementRef.current.addEventListener('scroll', onScroll);

    return () => {
      if (!scrollElementRef.current) return;
      scrollElementRef.current.removeEventListener('scroll', onScroll);
    };
  }, [scrollElementRef.current]);

  React.useLayoutEffect(() => {
    if (!thumbRef.current) return;
    thumbRef.current.addEventListener('mousedown', onThumbMouseDown);
    thumbRef.current.addEventListener('touchstart', onThumbMouseDown);
    thumbRef.current.addEventListener('mouseup', onThumbMouseup);
    thumbRef.current.addEventListener('touchend', onThumbMouseup);

    return () => {
      if (!thumbRef.current) return;
      thumbRef.current.removeEventListener('mousedown', onThumbMouseDown);
      thumbRef.current.removeEventListener('touchstart', onThumbMouseDown);
      thumbRef.current.removeEventListener('mouseup', onThumbMouseup);
      thumbRef.current.removeEventListener('touchend', onThumbMouseup);
    };
  }, [thumbRef.current]);

  React.useLayoutEffect(() => {
    document.addEventListener('mouseup', onDocumentMouseUp);
    document.addEventListener('touchend', onDocumentMouseUp);

    return () => {
      document.removeEventListener('mouseup', onDocumentMouseUp);
      document.removeEventListener('touchend', onDocumentMouseUp);
    };
  }, []);

  React.useLayoutEffect(() => {
    if (!trackRef.current) return;
    trackRef.current.addEventListener('click', onTrackClick);
    trackRef.current.addEventListener('touch', onTrackClick);

    return () => {
      if (!trackRef.current) return;
      trackRef.current.removeEventListener('click', onTrackClick);
      trackRef.current.removeEventListener('touch', onTrackClick);
    };
  }, [trackRef.current]);

  return {
    thumbClient,
    thumbOffset,
    trackClient,
    updateTrackClient,
    updateThumbClient,
    updateThumbOffset,
    trackRef,
    thumbRef,
  };
}

export default useScrollBar;
