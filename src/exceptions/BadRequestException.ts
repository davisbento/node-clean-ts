import HttpException from '@/interfaces/IHttpError';

class BadRequestException extends HttpException {
  constructor(message: string) {
    super(message, 400);
  }
}

export default BadRequestException;
