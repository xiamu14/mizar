import NextImage from 'next/image';
import React, { useCallback } from 'react';

function $MyImage(props: { src: string; alt?: string }) {
  const { src, alt } = props;
  const getSrc = useCallback((src: string) => {
    return /\/images\/paper\//.test(src) ? src : `/images/paper/${src}`;
  }, []);

  const fullSrc = getSrc(src);
  return <NextImage src={fullSrc} alt={alt ?? ''} fill />;
}

const MyImage = React.memo($MyImage);

export default MyImage;
