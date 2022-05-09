import { FRONT_DOMAIN } from '@/config/settings';

export const confirmEmailTemplate = (emailToken: string) => {
  return `
    Confirm your e-mail. <a href='${FRONT_DOMAIN}/confirm-email?token=${emailToken}' target='_blank'>Click here</a>
    `;
};
