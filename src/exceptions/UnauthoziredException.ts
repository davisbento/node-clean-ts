import HttpException from '@/interfaces/IHttpError';

class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(message, 401);
  }
}

export default UnauthorizedException;
