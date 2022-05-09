import HttpException from '@/interfaces/IHttpError';

class InternalServerError extends HttpException {
  constructor(message: string = '') {
    super(message, 500);
  }
}

export default InternalServerError;
