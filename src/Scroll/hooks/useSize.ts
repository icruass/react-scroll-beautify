import React from 'react';
import useResizeCallback from './useResizeCallback';

type Size = {
  clientWidth: number;
  clientHeight: number;
  offsetWidth: number;
  offsetHeight: number;
};

function useSize(target: any): Size | Record<any, any> {
  const [state, setState] = React.useState({});

  useResizeCallback(target, entry => {
    const { clientWidth, clientHeight, offsetWidth, offsetHeight } = entry.target;
    setState({
      clientWidth,
      clientHeight,
      offsetWidth,
      offsetHeight,
    });
  });

  return state;
}

export default useSize;
