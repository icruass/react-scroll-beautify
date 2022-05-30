import React from 'react';

export type ScrollContainerProps = React.HTMLAttributes<any> & {
  as?: any;
  ref?: React.Ref<any>;
};

function ScrollContainer(props: ScrollContainerProps, ref: React.Ref<any>) {
  const { as: Component = 'div', ...restProps } = props;

  return <Component ref={ref} {...restProps} />;
}

export default React.forwardRef(ScrollContainer);
