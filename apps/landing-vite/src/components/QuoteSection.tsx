import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import QuoteForm, { QuoteFormData } from '../components/QuoteForm';
import QuoteResults, { Quotation } from '../components/QuoteResults';
import { shipmentOrderService } from '../services/shipment.order.service';


export default function QuoteSection() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [quotationList, setQuotationList] = useState<Quotation[]>([]);

  const handleQuoteSubmit = async (formData: QuoteFormData) => {
    setLoading(true);

    try {
      const result = await shipmentOrderService.shipmentOrderQuote(formData);
      setQuotationList(result);
    } catch (error) {
      console.error('Error calculating quote:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setQuotationList([]);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <QuoteForm onQuoteSubmit={handleQuoteSubmit} loading={loading} />
        </div>
        <div>
          {quotationList.length > 0 ? (
            <QuoteResults quotationList={quotationList} onReset={handleReset} />
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-8 flex items-center justify-center h-full">
              <div className="text-center text-gray-400">
                <p className="text-lg">{t('quote.form.fillForm')}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}