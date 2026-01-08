// Payment model
export interface IPayment {
  id: string;
  amount: number;
  rideId: string;
  status: 'pending' | 'completed' | 'failed';
}
