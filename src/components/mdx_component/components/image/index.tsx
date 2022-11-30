import NextImage from 'next/image';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import style from './index.module.scss';
interface ImageProps {
  src: string;
  width: number;
  height: number;
  border?: boolean | string;
  alt?: string;
  scale?: string;
}

function $Image(props: ImageProps) {
  const { src, border = false, alt = 'illustration', scale = '0.98' } = props;
  const boxRef = useRef<HTMLDivElement>(null);
  const [renderSize, setRenderSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (boxRef.current) {
      const originalWidth = props.width;
      const originalHeight = props.height;
      const width = Math.floor(boxRef.current.clientWidth * parseFloat(scale));
      const height = Math.floor(
        (width * (originalHeight as number)) / (originalWidth as number)
      );

      setRenderSize({ width, height });
    }
  }, [props, scale]);

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
      <NextImage src={perfectSrc} alt={alt} {...renderSize} />
    </div>
  );
}

const Image = React.memo($Image);

export default Image;
