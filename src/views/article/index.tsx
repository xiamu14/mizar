import { allPosts, allSnippets, Post, Snippet } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-use';
import AspectDiv from '../../components/aspect_div';
import Divider from '../../components/divider';
import mdxComponent from '../../components/mdx_component';
import MyImage from '../../components/my_image';
import ContentSpace from '../../layouts/content_space';
import emptyCode from '../../utils/empty_code';
import style from './index.module.scss';
export default function Article() {
  const location = useLocation();
  const [data, setData] = useState<Snippet | Post>();

  useEffect(() => {
    const dataset = location.pathname?.includes('post')
      ? allPosts
      : allSnippets;
    const article = (dataset as any).find((item: any) =>
      location.pathname?.includes(item.slug)
    );
    setData(article);
  }, [location.pathname]);

  const handleOpenMind = useCallback(() => {
    window.open(
      `/mind/${data?.slug}`,
      '_blank',
      'height=600,width=1200,top=0,left=0,toolbar=no,menubar=no'
    );
  }, [data]);

  const Component = useMDXComponent(data ? data.body.code : emptyCode);
  if (!data) return null;

  return (
    <ContentSpace>
      <div className={style['box']}>
        <header className={style.header}>
          <h1 className={style['title']} onClick={handleOpenMind}>
            {data.title}
          </h1>
          <p className={style['description']}>{data.description}</p>
        </header>
        <div className={style['container']}>
          <div className={style.content}>
            <div className={style.cover}>
              <AspectDiv width="100%" height="48%">
                <MyImage src={data.cover}></MyImage>
              </AspectDiv>
            </div>
            <div className={style.info}>
              <p>
                {format(parseISO(data.date), 'MMMM dd, yyyy')} /{' '}
                {data.readingTime.text}
              </p>
            </div>
            <Divider />
            <div className="article">
              <Component components={mdxComponent} />
            </div>
          </div>
          {/* <div className={style.aside}>
            <div className={style.placeholder}></div>
            <PostPopular />
          </div> */}
        </div>
      </div>
    </ContentSpace>
  );
}
