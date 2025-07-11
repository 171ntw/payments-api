import type { Request, Response } from "express";
import MercadoPagoService from "../functions/mp";

const supportedBanks = ['mp'];

export async function createPayment(req: Request, res: Response): Promise<void> {
  const { bank, method, token, amount, description, email, accessToken } = req.query;

  if (typeof bank !== 'string' || !supportedBanks.includes(bank)) {
    res.status(400).json({ error: 'Invalid Bank' });
    return;
  }

  if (
    typeof method !== 'string' ||
    typeof token !== 'string' ||
    typeof amount !== 'string' ||
    typeof description !== 'string' ||
    typeof accessToken !== 'string'
  ) {
    res.status(400).json({ error: 'Missing or invalid required payment parameters' });
    return;
  }

  try {
    switch (bank) {
      case 'mp':
        const mpService = new MercadoPagoService(accessToken);
        const payment = await mpService.Create({
          method,
          token,
          amount: parseFloat(amount),
          description,
          email: typeof email === 'string' ? email : '171ntw@envisionapp.com.br',
        });
        res.json(payment);
        break;

      default:
        res.status(400).json({ error: 'Unsupported payment method' });
        break;
    }
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ error: 'Failed to create payment' });
  }
}

export async function paymentInfo(req: Request, res: Response): Promise<void> {
  const { bank, paymentId, token, type } = req.query;

  if (typeof bank !== 'string' || !supportedBanks.includes(bank)) {
    res.status(400).json({ error: 'Invalid Bank' });
    return;
  }

  if (typeof paymentId !== 'string' || typeof token !== 'string' || typeof type !== 'string') {
    res.status(400).json({ error: 'Missing paymentId, token or type' });
    return;
  }

  try {
    switch (bank) {
      case 'mp':
        const mpService = new MercadoPagoService(token);
        const info = await mpService.Info({ paymentId });

        const status = info.status || 'unknown';
        const approved = status === 'approved';

        if (type === 'completo') {
          res.json({ paymentId, status, approved, detail: info });
          return;
        } else if (type === 'resumido') {
          res.json({ paymentId, status, approved });
          return
        } else if (type === 'completo-html') {
          res.render('payment-info', { paymentId, status, approved, detail: info });
          return;
        } else if (type === 'resumido-html') {
          res.render('payment-info', { paymentId, status, approved });
          return;
        }
        break;

      default:
        res.status(400).json({ error: 'Unsupported payment method' });
        break;
    }
  } catch (error) {
    console.error("Error fetching payment info:", error);
    res.status(500).json({ error: 'Failed to fetch payment info' });
  }
}