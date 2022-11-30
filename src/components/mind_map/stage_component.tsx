import { Post } from 'contentlayer/generated';
import { useEffect, useRef } from 'react';
import { getHeadings, getTreeData } from '../../utils/mdx';
import { drawTree } from './draw_tree';
import style from './index.module.scss';
import { init } from './render';
function StageComponent({ post, data }: { post?: Post; data?: any }) {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (mapRef.current) {
      init(mapRef.current);
      if (post) {
        const toc = getHeadings(post.body.raw);

        const data = {
          name: post.title,
          children: getTreeData(toc),
        };
        console.log(
          '%c debug',
          'background: #69c0ff; color: white; padding: 4px',
          data
        );

        drawTree(data);
      }
      if (data) {
        drawTree(data);
      }
    }
  }, [data, post]);
  return <div ref={mapRef} className={style['mind-container']}></div>;
}

export default StageComponent;
