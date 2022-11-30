import React from 'react';
import style from './index.module.scss';
function $ContentWidth({ children }: React.PropsWithChildren<{}>) {
  return <div className={style['content-layout']}>{children}</div>;
}

const ContentWidth = React.memo($ContentWidth);

export default ContentWidth;
