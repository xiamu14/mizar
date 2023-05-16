import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from 'contentlayer/source-files';
import readingTime from 'reading-time';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  wordCount: {
    type: 'number',
    resolve: (doc) => doc.body.raw.split(/\s+/gu).length,
  },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
  },
};

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    description: { type: 'string', required: true },
    cover: { type: 'string', required: true },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    status: {
      type: 'string',
      description: 'draft|popular|subject|common|recommend', // 草稿|受欢迎|主题|一般
      required: true,
    },
    tags: {
      type: 'string',
      description: 'keyword',
    },
  },
  computedFields,
}));

const Snippet = defineDocumentType(() => ({
  name: 'Snippet',
  filePathPattern: 'snippets/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    cover: { type: 'string', required: true },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: 'src/draft',
  disableImportAliasWarning: true,
  documentTypes: [Post, Snippet],
  mdx: {
    rehypePlugins: [rehypePrism, rehypeSlug],
  },
});
