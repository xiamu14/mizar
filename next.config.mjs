/** @type {import('next').NextConfig} */
import { withContentlayer } from 'next-contentlayer';

export default withContentlayer({
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    disableStaticImages: false,
    domains: ['images.ctfassets.net'],
  },
  async rewrites() {
    return [
      {
        source: '/:any*',
        destination: '/',
      },
    ];
  },
});
