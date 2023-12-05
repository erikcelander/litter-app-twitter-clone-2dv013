import million from 'million/compiler';

const isStaging = process.env.BUILD_ENV === 'staging';

const nextConfig = {
  reactStrictMode: true,
  basePath: isStaging ? '/staging' : '', // Set the base path to '/staging' only for staging builds
};

const millionConfig = {
  auto: { rsc: true },
};

export default million.next(nextConfig, millionConfig);
