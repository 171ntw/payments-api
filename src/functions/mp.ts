import { MercadoPagoConfig, Payment } from "mercadopago";

interface CreatePaymentParams {
  method: string;
  token: string;
  amount: number;
  description: string;
  email: string;
  installments?: number;
}

interface InfoParams {
  paymentId: string;
}

class MercadoPagoService {
  client: MercadoPagoConfig;

  constructor(accessToken: string) {
    this.client = new MercadoPagoConfig({ accessToken });
  }

  async Create(params: CreatePaymentParams) {
    const payment = new Payment(this.client);
    return await payment.create({
      body: {
        transaction_amount: params.amount,
        token: params.token,
        description: params.description,
        payment_method_id: params.method,
        installments: params.installments ?? 1,
        payer: {
          email: params.email,
        },
      },
    });
  }

  async Info(params: InfoParams) {
    const payment = new Payment(this.client);
    return await payment.get({ id: params.paymentId });
  }
}

export default MercadoPagoService;