// 获取元素的横向滚动条的滑块宽度
export function getScrollXThumbWidth(dom: any) {
  const clientWidth = dom.clientWidth;
  const scrollWidth = dom.scrollWidth;
  const scrollXThumbWidth = clientWidth * (clientWidth / scrollWidth);

  if (scrollWidth <= clientWidth) return 0;
  return scrollXThumbWidth;
}

// 获取元素的纵向滚动条的滑块高度
export function getScrollYThumbHeight(dom: any) {
  const clientHeight = dom.clientHeight;
  const scrollHeight = dom.scrollHeight;

  const scrollYThumbHeight = clientHeight * (clientHeight / scrollHeight);

  if (scrollHeight <= clientHeight) return 0;
  return scrollYThumbHeight;
}

// 获取元素的横向滚动条的滑块的左边距离
export function getScrollXThumbOffset(dom: any, scrollLeft: any) {
  const clientWidth = dom.clientWidth;
  const scrollWidth = dom.scrollWidth;
  const scrollXThumbWidth = getScrollXThumbWidth(dom);

  const scrollXThumbOffset =
    scrollLeft / ((scrollWidth - clientWidth) / (clientWidth - scrollXThumbWidth));
  return scrollXThumbOffset;
}

// 获取元素的纵向滚动条的滑块的顶部距离
export function getScrollYThumbOffset(dom: any, scrollTop: any) {
  const clientHeight = dom.clientHeight;
  const scrollHeight = dom.scrollHeight;
  const scrollYThumbHeight = getScrollYThumbHeight(dom);

  const scrollYThumbOffset =
    scrollTop / ((scrollHeight - clientHeight) / (clientHeight - scrollYThumbHeight));
  return scrollYThumbOffset;
}

// 根据滑块位置获取元素的横向滚动条的左边距离
export function getScrollLeftByThumbOffset(dom: any, scrollXThumbOffset: any) {
  const clientWidth = dom.clientWidth;
  const scrollWidth = dom.scrollWidth;
  const scrollXThumbWidth = getScrollXThumbWidth(dom);

  const scrollLeft =
    ((scrollWidth - clientWidth) / (clientWidth - scrollXThumbWidth)) * scrollXThumbOffset;
  return scrollLeft;
}

// 根据滑块位置获取元素的纵向滚动条的左边距离
export function getScrollTopByThumbOffset(dom: any, scrollYThumbOffset: any) {
  const clientHeight = dom.clientHeight;
  const scrollHeight = dom.scrollHeight;
  const scrollYThumbHeight = getScrollYThumbHeight(dom);

  const scrollTop =
    ((scrollHeight - clientHeight) / (clientHeight - scrollYThumbHeight)) * scrollYThumbOffset;
  return scrollTop;
}

// 获取自定义scrollTop的取值范围
export function getScrollTopRange(dom: any) {
  const clientHeight = dom.clientHeight;
  const scrollHeight = dom.scrollHeight;
  const min = 0;
  const max = scrollHeight - clientHeight;
  return [min, max];
}

// 获取自定义scrollLeft的取值范围
export function getScrollLeftRange(dom: any) {
  const clientWidth = dom.clientWidth;
  const scrollWidth = dom.scrollWidth;
  const min = 0;
  const max = scrollWidth - clientWidth;
  return [min, max];
}

export function getAgentIsMobile() {
  const userAgentInfo = navigator.userAgent;

  const mobileAgents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];

  let mobile_flag = false;

  //根据userAgent判断是否是手机
  for (let v = 0; v < mobileAgents.length; v++) {
    if (userAgentInfo.indexOf(mobileAgents[v]) > 0) {
      mobile_flag = true;
      break;
    }
  }

  return mobile_flag;
}
