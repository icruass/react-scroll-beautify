import React from 'react';
import useScrollStateBind from '../../src/Scroll/hooks/useScrollStateBind';

function Test(props: any) {
  const scrollElementRef = React.useRef<HTMLDivElement | null>(null);

  const [scrollTop, setScrollTop] = React.useState(100);

  const onScrollTopChange = (newScrollTop) => {
    console.log('onScrollTopChange');

    setScrollTop(newScrollTop);
  }

  useScrollStateBind(scrollElementRef, {
    scrollTop,
    onScrollTopChange,
  });

  return (
    <div>
      <div>{`scrollTop is ${scrollTop}`}</div>
      <button onClick={() => setScrollTop(pre => pre + 10)}>click + 10</button>
      <div
        ref={scrollElementRef}
        style={{
          position: 'relative',
          overflow: 'auto',
          height: 300,
          width: '100%',
          minWidth: 500,
        }}
      >
        <div
          style={{
            height: 900,
            width: 3000,
            backgroundImage: 'linear-gradient(-96deg, #e27a7a, #c19997, #91b3b5, #19cbd4)',
          }}
        />
      </div>
    </div>
  );
}

export default Test;
