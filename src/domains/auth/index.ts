import { adaptRoute } from '@/adapters/RouterAdapter';
import { validateResource } from '@/middleware/validation';
import express from 'express';

import { makeAuthenticateController } from './factories/AuthenticateFactory';
import { makeConfirmEmailController } from './factories/ConfirmEmailFactory';
import { makeForgotPasswordController } from './factories/ForgotPasswordFactory';
import { makeSignUpController } from './factories/SignUpFactory';
import { authenticateDTO } from './validation/AuthenticateDTO';
import { confirmEmailDTO } from './validation/ConfirmEmailDTO';
import { forgotPasswordDTO } from './validation/ForgotPasswordDTO';
import { signUpDTO } from './validation/SignUpDTO';

const router = express.Router();

router.post('/sign-up', validateResource(signUpDTO), adaptRoute(makeSignUpController()));
router.post('/authenticate', validateResource(authenticateDTO), adaptRoute(makeAuthenticateController()));
router.post('/confirm-email', validateResource(confirmEmailDTO), adaptRoute(makeConfirmEmailController()));
router.post('/forgot-password', validateResource(forgotPasswordDTO), adaptRoute(makeForgotPasswordController()));

export default router;
