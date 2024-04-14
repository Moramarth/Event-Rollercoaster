import QRCode from 'qrcode';

export function generateTicket(ticketId, color) {
  const image = QRCode.toDataURL(ticketId, { color });
  return image;
}
