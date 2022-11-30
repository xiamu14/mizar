import React from 'react';
import style from './index.module.scss';

interface Props {
  title: string;
  desc: JSX.Element | string;
}

function $ViewHeader({ title, desc }: Props) {
  return (
    <header className={style.header}>
      <h1 className={style['title']}>{title}</h1>
      <div>{desc}</div>
    </header>
  );
}

const ViewHeader = React.memo($ViewHeader);

export default ViewHeader;
