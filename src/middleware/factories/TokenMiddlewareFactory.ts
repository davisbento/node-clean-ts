import { JwtProvider } from '@/infra/jwt/implementations/JwtProvider';

import { TokenMiddleware } from '../TokenMiddleware';

export const makeTokenMiddleware = () => {
  const jwtProvider = new JwtProvider();
  const tokenMiddleware = new TokenMiddleware(jwtProvider);

  return tokenMiddleware;
};
