export const CarrierMap: { [key: string]: Carrier } = {
  ups: {
    name: 'UPS',
    service: { "65": 'UPS - Saver' },
    logo: 'ups_logo_square.png',
  },
  dhl: {
    name: 'DHL',
    service: { "P": 'DHL - Express Worldwide nondoc' },
    logo: 'dhl_logo_square.png',
  },
  fedex: {
    name: 'FedEx',
    service: { "FEDEX_INTERNATIONAL_PRIORITY": 'FedEx - International Priority®' },
    logo: 'fedex_logo_square.jpeg',
  }
}

export interface Carrier {
  name: string;
  service: { [key: string]: string };
  logo: string;
}

export const WhatsappUrl = "https://web.whatsapp.com/send?phone=85297703991&text=%E4%BD%A0%E5%A5%BD%EF%BC%8C%E6%88%91%E6%83%B3%E4%BA%86%E8%A7%A3%E6%9B%B4%E5%A4%9A%E5%85%A8%E7%90%83%E5%AE%A2%E8%A3%BD%E5%8C%96%E7%89%A9%E6%B5%81%E6%9C%8D%E5%8B%99%EF%BC%81"