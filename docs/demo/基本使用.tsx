import React from 'react';
import Scroll from 'react-scroll-beautify';

function Demo() {
  const originScrollRef = React.useRef(null);
  const compScrollRef = React.useRef(null);

  const onScroll = (type) => {
    return (event) => {
      console.dir(`${type}`);
      console.dir(event);
    }
  }

  const children = (
    <div style={{
      height: 1200,
      minWidth: 1200,
      width: '100%',
      backgroundImage: 'linear-gradient(-96deg, #e27a7a, #c19997, #91b3b5, #19cbd4)'
    }} />
  );

  const style: any = {
    position: 'relative',
    overflow: 'auto',
    height: 300,
  }

  const renderCompScroll = (
    <Scroll
      ref={compScrollRef}
      onScroll={onScroll('Comp Scroll')}
      style={style}
    >
      {children}
    </Scroll>
  );

  const renderOriginScroll = (
    <div
      ref={originScrollRef}
      onScroll={onScroll('Origin Scroll')}
      style={style}
    >
      {children}
    </div>
  )

  return (
    <div>
      <div style={{ color: '#2c3e50', fontWeight: 600, marginBottom: 20 }}>原生scroll</div>
      {renderOriginScroll}

      <div style={{ padding: '15px 0' }} />

      <div style={{ color: '#2c3e50', fontWeight: 600, marginBottom: 20 }}>Scroll组件</div>
      {renderCompScroll}
    </div>
  );
}

export default Demo;
