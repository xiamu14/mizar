import Link from 'next/link';
import React from 'react';
import { MapItem } from '../../constants/type';
import MyImage from '../my_image';
import style from './index.module.scss';
interface Props {
  data: MapItem;
}

function $MapCard({ data }: Props) {
  return (
    <Link href={`/map/${data.name}`}>
      <div className={style['map-card']}>
        <div className={style['cover']}>
          <MyImage src={data.cover}></MyImage>
        </div>
        <h1>{data.name}</h1>
        <p className={style['description']}>{data.description}</p>
      </div>
    </Link>
  );
}

const MapCard = React.memo($MapCard);

export default MapCard;
