import React from 'react';

type Value = { scrollLeft?: number; scrollTop?: number };

function useScrollStateBind(scrollElementRef: any, options: any = {}) {
  const { scrollTop: scrollTopProp, onScrollTopChange } = options;

  const [scrollTopInner, setScrollTop] = React.useState(0);
  const scrollTopStateRef = React.useRef(scrollTopInner);

  const scrollTop = 'scrollTop' in options ? scrollTopProp : scrollTopInner;

  //   const onChange = (newValue: Value) => {
  //     const { scrollLeft: newScrollLeft, scrollTop: newScrollTop } = newValue;
  //     setScrollState(newValue);
  //     onScrollLeftChange(newScrollLeft);
  //     onScrollTopChange(newScrollTop);
  //   };

  const onScroll = e => {
    const { scrollTop: event_scrollTop, scrollLeft: event_scrollLeft } = e.currentTarget;
    // const newScrollState = {
    //   scrollTop: event_scrollTop,
    //   scrollLeft: event_scrollLeft,
    // };
    if (onScrollTopChange) {
      onScrollTopChange(event_scrollTop, e);
    }
    console.log('onScroll');
  };

  React.useLayoutEffect(() => {
    const scrollElementDom = scrollElementRef && scrollElementRef.current;
    if (!scrollElementDom) return;
    scrollElementDom.addEventListener('scroll', onScroll);
    return () => {
      if (!scrollElementDom) return;
      scrollElementDom.removeEventListener('scroll', onScroll);
    };
  }, [scrollElementRef]);

  React.useLayoutEffect(() => {
    const scrollElementDom = scrollElementRef && scrollElementRef.current;
    if (!scrollElementDom) return;
    scrollElementDom.scrollTop = scrollTop;
  }, [scrollTop, scrollElementRef]);

  return { scrollTop };
}

export default useScrollStateBind;
