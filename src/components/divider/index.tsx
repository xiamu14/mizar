import React from 'react';
import style from './index.module.scss';
function $Divider() {
  return <div className={style.divider}></div>;
}

const Divider = React.memo($Divider);

export default Divider;
