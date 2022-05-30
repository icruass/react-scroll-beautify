import React from 'react';

export type ScrollElementProps = React.HTMLAttributes<any> & {
  as?: any;
  ref?: React.Ref<any>;
};

function ScrollElement(props: ScrollElementProps, ref: React.Ref<any>) {
  const { as: Component = 'div', ...restProps } = props;

  return <Component ref={ref} {...restProps} />;
}

export default React.forwardRef(ScrollElement);
