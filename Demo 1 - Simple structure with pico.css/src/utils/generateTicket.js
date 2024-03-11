import QRCode from 'qrcode';

import { v4 as uuidv4 } from 'uuid';

export async function generateTicket(eventData) {
  const ticket = {
    id: uuidv4(),
    date: eventData.date,
    eventName: eventData.name,
  };

  ticket.img = await QRCode.toDataURL(ticket.id);
  return ticket;
}
