// Ride model
export interface IRide {
  id: string;
  passengerId: string;
  driverId?: string;
  status: 'requested' | 'ongoing' | 'completed' | 'cancelled';
}
