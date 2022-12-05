import NextImage from 'next/image';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getQueryString } from '../../../../utils/url_params';
import style from './index.module.scss';
interface ImageProps {
  src: string;
}

function $Image(props: ImageProps) {
  const { src } = props;
  const boxRef = useRef<HTMLDivElement>(null);
  const [renderSize, setRenderSize] = useState({ width: 0, height: 0 });
  const { originalWidth, originalHeight, scale, border } = useMemo(() => {
    // return new URLSearchParams(src);
    return {
      originalWidth: parseInt(getQueryString('w', src) ?? '0'),
      originalHeight: parseInt(getQueryString('h', src) ?? '0'),
      scale: parseFloat(getQueryString('s', src) ?? '1.0'),
      border: getQueryString('border', src),
    };
  }, [src]);

  useEffect(() => {
    if (boxRef.current) {
      const width = Math.floor(boxRef.current.clientWidth * scale);
      const height = Math.floor(
        (width * (originalHeight as number)) / (originalWidth as number)
      );

      setRenderSize({ width, height });
    }
  }, [originalHeight, originalWidth, scale]);

  const perfectSrc = useMemo(() => {
    return /\/images\/paper\//.test(src) ? src : `/images/paper/${src}`;
  }, [src]);

  return (
    <div
      ref={boxRef}
      className={style['img-wrapper']}
      style={{
        border: border ? '1px solid #d6dde4' : 'none',
      }}
    >
      <NextImage src={perfectSrc} alt={'illustration'} {...renderSize} />
    </div>
  );
}

const Image = React.memo($Image);

export default Image;
