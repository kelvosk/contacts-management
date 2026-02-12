export interface Contact {
  id: string;
  name: string;
  mobile: string;
  secondMobile?: string;
  notes: string;
  isBlocked: boolean;
  isEmergencyContact: boolean;
}
