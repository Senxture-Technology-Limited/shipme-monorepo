import { useState } from 'react';
import { MapPin, Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { countries } from "countries-list";
interface QuoteFormProps {
  onQuoteSubmit: (quoteData: QuoteFormData) => void;
  loading: boolean;
}

export interface PackageItem {
  weight: number;
  length: number;
  width: number;
  height: number;
  quantity: number;
}

export interface QuoteFormData {
  from: {
    country_a2: string;
  };
  to: {
    country_a2: string;
  };
  package_list: PackageItem[];
}

export default function QuoteForm({ onQuoteSubmit, loading }: QuoteFormProps) {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<QuoteFormData>({
    from: {
      country_a2: 'HK',
    },
    to: {
      country_a2: '',
    },
    package_list: [
      { weight: 0, length: 0, width: 0, height: 0, quantity: 1 }
    ],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuoteSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const path = name.split(".")

    setFormData(prev => {
      const section = path[0];
      const field = path[1];

      if ((section === 'from' || section === 'to') && field === 'country_a2') {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            country_a2: value,
          },
        };
      }

      return prev;
    });
  };

  const handlePackageChange = (index: number, field: keyof PackageItem, value: string) => {
    const newPackageList = [...formData.package_list];
    newPackageList[index] = {
      ...newPackageList[index],
      [field]: parseFloat(value) || 0
    };
    setFormData(prev => ({
      ...prev,
      package_list: newPackageList
    }));
  };

  const addPackage = () => {
    setFormData(prev => ({
      ...prev,
      package_list: [
        ...prev.package_list,
        {
          weight: 0,
          length: 0,
          width: 0,
          height: 0,
          quantity: 1
        }
      ]
    }));
  };

  const removePackage = (index: number) => {
    if (formData.package_list.length > 1) {
      setFormData(prev => ({
        ...prev,
        package_list: prev.package_list.filter((_, i) => i !== index)
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('quote.form.title')}</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            {t('quote.form.fromCountry')}
          </label>
          <select
            name="from.country_a2"
            value={formData.from.country_a2}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          >
            {Object.entries(countries).map(([alpha2, country]) => (
              <option key={alpha2} value={alpha2}>{alpha2} - {country.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            {t('quote.form.toCountry')}
          </label>
          <select
            name="to.country_a2"
            value={formData.to.country_a2}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          >
            <option value="">{t('quote.form.selectDestination')}</option>
            {Object.entries(countries).map(([alpha2, country]) => (
              <option key={alpha2} value={alpha2}>{alpha2} - {country.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {t('quote.form.packages')}
          </h3>
          <button
            type="button"
            onClick={addPackage}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            <Plus className="w-4 h-4" />
            {t('quote.form.addPackage')}
          </button>
        </div>

        {formData.package_list.map((pkg, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-md font-medium text-gray-700">
                {t('quote.form.package')} {index + 1}
              </h4>
              {formData.package_list.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePackage(index)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('quote.form.weight')} (kg)
                </label>
                <input
                  type="number"
                  value={pkg.weight || ''}
                  onChange={(e) => handlePackageChange(index, 'weight', e.target.value)}
                  step="0.1"
                  min="0.1"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('quote.form.length')} (cm)
                </label>
                <input
                  type="number"
                  value={pkg.length || ''}
                  onChange={(e) => handlePackageChange(index, 'length', e.target.value)}
                  step="0.1"
                  min="1"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('quote.form.width')} (cm)
                </label>
                <input
                  type="number"
                  value={pkg.width || ''}
                  onChange={(e) => handlePackageChange(index, 'width', e.target.value)}
                  step="0.1"
                  min="1"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('quote.form.height')} (cm)
                </label>
                <input
                  type="number"
                  value={pkg.height || ''}
                  onChange={(e) => handlePackageChange(index, 'height', e.target.value)}
                  step="0.1"
                  min="1"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('quote.form.quantity')}
                </label>
                <input
                  type="number"
                  value={pkg.quantity || ''}
                  onChange={(e) => handlePackageChange(index, 'quantity', e.target.value)}
                  min="1"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? t('quote.form.calculating') : t('quote.form.getQuote')}
      </button>
    </form>
  );
}
