import million from 'million/compiler';

const nextConfig = {
  reactStrictMode: true,
};

const millionConfig = {
  auto: { rsc: true },
};

export default million.next(nextConfig, millionConfig);
