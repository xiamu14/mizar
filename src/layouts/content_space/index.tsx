import React from 'react';
import style from './index.module.scss';
function $ContentSpace({ children }: React.PropsWithChildren<{}>) {
  return <div className={style['content-space']}>{children}</div>;
}

const ContentSpace = React.memo($ContentSpace);

export default ContentSpace;
