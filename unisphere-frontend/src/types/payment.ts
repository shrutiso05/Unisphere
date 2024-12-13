export interface Payment {
    id: number;
    applicationId: number;
    paymentType: string;
    amount: number;
    transactionId: string;
    paymentDate: string;
    status: string;
    paymentMode: string;
    paymentDetails: any;
  }