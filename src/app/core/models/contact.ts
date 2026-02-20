export interface Contact {
  id?: string;
  name: string;
  email: string;
  mobile: string;
  secondMobile?: string;
  notes: string;
  isBlocked: boolean;
  isEmergencyContact: boolean;
}
