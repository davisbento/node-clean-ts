import { SECRET_KEY } from '@/config/settings';
import jwt from 'jsonwebtoken';

import { IJwtProvider } from '../IJwtProvider';

export class JwtProvider implements IJwtProvider {
  public async generateToken(userId: string) {
    const token = await jwt.sign({ sub: userId }, SECRET_KEY, { expiresIn: '2d' });

    return token;
  }

  public async verifyToken(token: string) {
    try {
      const decoded: any = await jwt.verify(token, SECRET_KEY);

      return decoded.sub;
    } catch (err) {
      throw new Error(err);
    }
  }
}
