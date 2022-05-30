import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

function useResizeCallback(target: any, callback: any): void {
  React.useLayoutEffect(() => {
    const el =
      typeof target === 'function'
        ? target()
        : target && 'current' in target
        ? target.current
        : target;

    if (!el) return;

    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        if (typeof callback === 'function') {
          callback(entry);
        }
      });
    });

    resizeObserver.observe(el);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
}

export default useResizeCallback;
