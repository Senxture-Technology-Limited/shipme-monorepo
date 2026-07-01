import { useTranslation } from 'react-i18next';
import { CarrierMap } from '../config/const';

export interface Quotation {
  service: { vendor: string, service: string };
  weight: { billable: number, actual: number, dimension: number };
  price: number;
  breakdown: { base: number, fuel: number, pss: number, service_list: { code: string, name: string, currency: string, price: number }[] };
  unit: { weight: string, currency: string };
  additional: { from_country_a2: string, to_country_a2: string, zone: string, delivery_type: string };
  error?: { code?: string, message: string };
}

interface QuoteResultsProps {
  quotationList: Quotation[];
  onReset: () => void;
}

const toNumericPrice = (price: number | string | undefined) => {
  if (typeof price === 'number') return price;
  if (typeof price === 'string') {
    const parsed = parseFloat(price);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
};

export default function QuoteResults({ quotationList, onReset }: QuoteResultsProps) {
  const { t } = useTranslation();
  console.log("OMG quotation list", quotationList)
  const sortedQuotationList = [...quotationList].filter(quotation => !!quotation.price).sort(
    (a, b) => toNumericPrice(a.price) - toNumericPrice(b.price)
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">{t('quote.results.title')}</h2>
          <p className="text-sm text-gray-600">{t('quote.results.subtitle')}</p>
        </div>

        <div className="space-y-4">
          {sortedQuotationList.map((quotation, index) => (
            <QuotationCard key={index} index={index} quotation={quotation} />
          ))}
        </div>

        <div className="mt-6">
          <button
            onClick={onReset}
            className="w-full border-2 border-orange-500 text-orange-500 px-6 py-2 rounded-lg font-semibold hover:bg-orange-50 transition"
          >
            {t('quote.results.newQuote')}
          </button>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mt-6">
          <p className="text-xs text-gray-700">
            <strong>{t('quote.results.note')}</strong> {t('quote.results.noteText')}
          </p>
        </div>
      </div>
    </div>
  );
}

function QuotationCard({ index, quotation }: { index: number, quotation: Quotation }) {
  const { t } = useTranslation();

  if (quotation.error) {
    console.log("quotation error:", quotation);
    return null;
  }

  const carrier = CarrierMap[quotation.service.vendor] || {};
  const service = carrier.service[quotation.service.service];
  const currency = quotation.unit.currency;
  const priceValue = toNumericPrice(quotation.price);
  const price = priceValue.toFixed(2);
  const freightPrice = (quotation.breakdown.base + quotation.breakdown.pss).toFixed(2);
  const fuelPrice = quotation.breakdown.fuel.toFixed(2);

  return (
    <div
      key={`${carrier.name};${service}`}
      className={`rounded-lg border-2 p-4 transition hover:shadow-md ${index === 0 ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
        }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <img src={`/partner/${carrier.logo}`} alt={carrier.name} className="h-10" />
          {index === 0 && (
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {t('quote.results.bestPrice')}
            </span>
          )}
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {currency} {price}
          </div>
          <div className="text-xs text-gray-600">{t('quote.results.estimated')}</div>
        </div>
      </div>
      <div className="text-md font-semibold text-gray-600 mb-3">{service}</div>
      <ul className="space-y-1 mb-3">
        <li className="flex items-start text-sm text-gray-600">
          <span>{currency} {freightPrice} - FREIGHT</span>
        </li>
        <li className="flex items-start text-sm text-gray-600">
          <span>{currency} {fuelPrice} - FUEL SURCHARGE</span>
        </li>
        {quotation.breakdown.service_list.map((charge, idx) => (
          <li key={idx} className="flex items-start text-sm text-gray-600">
            <span>{currency} {charge.price.toFixed(2)} - {charge.name}</span>
          </li>
        ))}
      </ul>
      {/* TODO: button to redirect user to shipme whatsapp */}
      {/* <button className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition">
        {t('quote.results.selectCarrier')}
      </button> */}
    </div>
  )
}