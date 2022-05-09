import HttpException from '@/interfaces/IHttpError';

class HttpRequestException extends HttpException {
  constructor(message: string, status: number) {
    super(message, status);
  }
}

export default HttpRequestException;
