import { IController } from '@/interfaces/IController';

import { HomeController } from '../controllers/HomeController';

export const makeHomeController = (): IController => {
  const homeController = new HomeController();

  return homeController;
};
