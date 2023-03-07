import { allPosts } from 'contentlayer/generated';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-use';
import Divider from '../../components/divider';
import PostCard from '../../components/post_card';
import ViewHeader from '../../components/view_header';
import { maps } from '../../constants/maps';
import { MapItem } from '../../constants/type';
import ContentSpace from '../../layouts/content_space';
import style from './index.module.scss';

export function MapView() {
  const location = useLocation();
  const [data, setData] = useState<MapItem>();

  useEffect(() => {
    const item = maps.find((item) => location.pathname?.includes(item.name));
    setData(item);
  }, [location.pathname]);

  const posts = useMemo(
    () =>
      allPosts
        .filter(
          (it) =>
            it.status !== 'draft' &&
            it._raw.sourceFileDir.includes((data?.key ?? '').toLowerCase())
        )
        .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date))),
    [data?.key]
  );

  return (
    <div>
      <ContentSpace>
        <ViewHeader
          title={data?.name ?? ''}
          desc={data?.description ?? ''}
        ></ViewHeader>
        <Divider />
        <div className={style['list-container']}>
          {posts.map((item, index) => {
            return <PostCard key={index} data={item} />;
          })}
        </div>
      </ContentSpace>
    </div>
  );
}
