import React from 'react';
import style from './index.module.scss';
function $Tag({ text }: { text: string }) {
  return <div className={style.tag}>{text}</div>;
}

const Tag = React.memo($Tag);

export default Tag;
