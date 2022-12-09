import { allPosts } from 'contentlayer/generated';
import { useMemo } from 'react';
import Divider from '../../components/divider';
import PostCard from '../../components/post_card';
import style from './index.module.scss';
export default function Dashboard() {
  const posts = useMemo(
    () =>
      allPosts
        .filter((it) => it.status !== 'draft')
        .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date))),
    []
  );

  const recommend = useMemo(() => {
    return posts.filter((it) => it.status === 'recommend');
  }, [posts]);

  const subject = useMemo(() => {
    return posts.filter((it) => it.status === 'subject');
  }, [posts]);

  const popular = useMemo(() => {
    return posts.filter((it) => it.status === 'popular');
  }, [posts]);

  const common = useMemo(() => {
    return posts.filter((it) => it.status === 'common');
  }, [posts]);

  const drafts = useMemo(
    () =>
      allPosts
        .filter((it) => it.status === 'draft')
        .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date))),
    []
  );

  return (
    <div className={style['dashboard']}>
      <h1>Recommend</h1>
      <Divider />
      <div className={style['list-container']}>
        {recommend.map((item, index) => {
          return <PostCard key={index} data={item} />;
        })}
      </div>

      <h1>Subject</h1>
      <Divider />
      <div className={style['list-container']}>
        {subject.map((item, index) => {
          return <PostCard key={index} data={item} />;
        })}
      </div>
      <h1>Popular</h1>
      <Divider />
      <div className={style['list-container']}>
        {popular.map((item, index) => {
          return <PostCard key={index} data={item} />;
        })}
      </div>
      <h1>Common</h1>
      <Divider />
      <div className={style['list-container']}>
        {common.map((item, index) => {
          return <PostCard key={index} data={item} />;
        })}
      </div>
      <h1>Drafts</h1>
      <Divider />
      <div className={style['list-container']}>
        {drafts.map((item, index) => {
          return <PostCard key={index} data={item} />;
        })}
      </div>
    </div>
  );
}
