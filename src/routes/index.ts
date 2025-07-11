import { Router } from 'express';
import { createPayment, paymentInfo } from '../controllers/payment';

const router = Router();

router.get('/create-payment', createPayment);
router.get('/info-payment', paymentInfo)

export default router;