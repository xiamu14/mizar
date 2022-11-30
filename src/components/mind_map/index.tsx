import { Post } from 'contentlayer/generated';
import dynamic from 'next/dynamic';

const StageComponent = dynamic(() => import('./stage_component'), {
  ssr: false,
});

function MindMap({ post, data }: { post?: Post; data?: any }) {
  return <StageComponent post={post} data={data} />;
}

export default MindMap;
