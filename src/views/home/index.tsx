import { allPosts } from 'contentlayer/generated';
import React, { useMemo } from 'react';
import Divider from '../../components/divider';
import PostCard from '../../components/post_card';
import PostCollection from '../../components/post_collection';
import PostPopular from '../../components/post_popular';
import ViewHeader from '../../components/view_header';
import ContentSpace from '../../layouts/content_space';
import style from './index.module.scss';
function $Home() {
  const posts = useMemo(
    () =>
      allPosts
        .filter((it) => it.status !== 'draft')
        .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date))),
    []
  );
  return (
    <div>
      <ContentSpace>
        <ViewHeader
          title="博客"
          desc={
            <p>
              我的博客网站，名曰“言之有物”，出自《周易·家人》：“君子以言有物，而行有恒”。
            </p>
          }
        />
        <Divider />
        <div className={style['commend-container']}>
          <div className={style['post-detail']}>
            <div className={style['post-item-small']}>
              <PostCard data={posts[0]} />
              <PostCard data={posts[0]} />
            </div>
            <div className={style['post-item-big']}>
              <PostCard mode="big" data={posts[0]} />
            </div>
          </div>
          <div className={style['post-outline']}>
            <PostCollection />
            <PostPopular />
          </div>
        </div>
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

const Home = React.memo($Home);

export default Home;
