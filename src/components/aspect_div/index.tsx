import React from 'react';
import style from './index.module.scss';
interface Props {
  /** 宽度 */
  width: string;
  /** percent: 百分比 */
  height: string;
}

const $AspectDiv = (props: React.PropsWithChildren<Props>) => {
  const { children, width, height } = props;
  return (
    <div className={style['aspect-div']} style={{ width }}>
      <div className={style['aspect-height']} style={{ paddingBottom: height }}>
        <div className={style['content-box']}>{children}</div>
      </div>
    </div>
  );
};

const AspectDiv = React.memo($AspectDiv);

export default AspectDiv;
