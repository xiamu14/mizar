import { allPosts, Post } from 'contentlayer/generated';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-use';
import MindMap from '../../components/mind_map';

function Mind() {
  const location = useLocation();
  const [data, setData] = useState<Post>();

  useEffect(() => {
    const post = allPosts.find((item) =>
      location.pathname?.includes(item.slug)
    );
    setData(post);
  }, [location.pathname]);
  return (
    <div>
      <MindMap post={data}></MindMap>
    </div>
  );
}

export default Mind;
