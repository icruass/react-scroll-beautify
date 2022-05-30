import React from 'react';
import useScrollBar from '../../src/Scroll/hooks/useScrollBar';

function Test() {
  const scrollElementRef = React.useRef();

  const scrollXBarHookRes = useScrollBar({
    barType: 'x',
    scrollElementRef,
  });

  const scrollYBarHookRes = useScrollBar({
    barType: 'y',
    scrollElementRef,
  });

  return (
    <div>
      <div
        ref={scrollXBarHookRes.trackRef}
        style={{
          width: scrollXBarHookRes.trackClient,
          height: 8,
          background: '#f1f1f1',
          padding: '4px',
          borderRadius: 12,
          position: 'relative',
        }}
      >
        <div
          ref={scrollXBarHookRes.thumbRef}
          style={{
            width: scrollXBarHookRes.thumbClient,
            height: 8,
            borderRadius: 6,
            background: 'red',
            cursor: 'pointer',
            marginLeft: 6,
            marginRight: 12,
            transform: `translate3d(${scrollXBarHookRes.thumbOffset}px, 0, 0)`,
          }}
        />
      </div>

      <div style={{ margin: '20px 0' }} />

      <div
        ref={scrollYBarHookRes.trackRef}
        style={{
          width: 10,
          boxSizing: 'border-box',
          height: scrollYBarHookRes.trackClient,
          background: '#f1f1f1',
          borderRadius: 12,
          position: 'relative',
        }}
      >
        <div
          ref={scrollYBarHookRes.thumbRef}
          style={{
            height: scrollYBarHookRes.thumbClient,
            width: '100%',
            borderRadius: 6,
            background: 'red',
            cursor: 'pointer',
            transform: `translate3d(0, ${scrollYBarHookRes.thumbOffset}px, 0)`,
          }}
        />
      </div>

      <div style={{ margin: '20px 0' }} />

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
