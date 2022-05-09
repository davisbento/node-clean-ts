import { BOT_API_URL } from '@/config/settings';
import { ApiProvider } from '@/infra/api/implementations/ApiProvider';

export const makeBotApi = () => {
  const apiProvider = new ApiProvider(BOT_API_URL);

  return apiProvider;
};
