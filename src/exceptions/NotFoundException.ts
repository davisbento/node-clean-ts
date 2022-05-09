import HttpException from '@/interfaces/IHttpError';

class NotFoundException extends HttpException {
  constructor(message: string) {
    super(message, 404);
  }
}

export default NotFoundException;
