import Link from 'next/link';
import React from 'react';
import MyImage from '../my_image';
import style from './index.module.scss';
interface Props {
  title: string;
  desc: string;
  cover: string;
  slug: string;
}

function $SnippetCard({ title, desc, cover, slug }: Props) {
  return (
    <Link href={`/snippet/${slug}`}>
      <div className={style['snippet-card']}>
        <div className={style['cover']}>
          <MyImage src={cover}></MyImage>
        </div>
        <h1>{title}</h1>
        <p>{desc}</p>
      </div>
    </Link>
  );
}

const SnippetCard = React.memo($SnippetCard);

export default SnippetCard;
