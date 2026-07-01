import { QuoteFormData } from "../components/QuoteForm";
import { Config } from "../config/api.config";

export const shipmentOrderService = {
  shipmentOrderQuote,
}

const defaultServiceList = [
  { "vendor": "ups", "service": "65" },
  { "vendor": "dhl", "service": "P" },
  { "vendor": "fedex", "service": "FEDEX_INTERNATIONAL_PRIORITY" },
]

async function shipmentOrderQuote(formData: QuoteFormData) {
  const req = defaultServiceList.map(service => {
    return {
      ...formData,
      service: service,
    }
  })

  // send api request to get quotes
  const response = await fetch(
    `${Config?.BaseUrl}/v1/public/shipment-order/quote`,
    { method: 'POST', body: JSON.stringify(req), headers: { 'Content-Type': 'application/json' } }
  );
  const data = await response.json();
  return data;
}