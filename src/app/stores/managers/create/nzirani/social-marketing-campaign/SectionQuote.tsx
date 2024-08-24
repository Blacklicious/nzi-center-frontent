'use client';
import React, { useEffect, useState } from 'react';
import Cart from '../../Cart';
import { CaretLeftOutlined } from '@ant-design/icons';
import { Service } from './DataService';
import { calc } from 'antd/es/theme/internal';

interface QuoteSectionProps {
  goBack: () => void;
  clientPackage: Service[]; // Receive clientPackage as a prop
}

const QuoteSection: React.FC<QuoteSectionProps> = ({ goBack, clientPackage }) => {
  const [reductionCode, setReductionCode] = useState<string>('AIGLE_ROYAL_MALIEN');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [deliveryDuration, setDeliveryDuration] = useState<string>('');
  const [taxes, setTaxes] = useState<number>(0);
  const [total, setTotal] = useState<number>(0); // This will be calculated
  const [reductionAmount, setReductionAmount] = useState<number>(0);
  const [reductionValue, setReductionValue] = useState<number>(0);
  const [deliveryCost, setDeliveryCost] = useState<number>(0);

  // Tax rate (assuming 18% as mentioned in the placeholder)
  const taxRate = 0;
  const couponValue = 0.13;
  const handleTotalChange = (newTotal: number) => {
    setTotal(newTotal);
  };


  useEffect(() => {
    // Calculate subtotal
    const subtotal =  total; // The total from the Cart component
    console.log("Subtotal: ", subtotal);
    // Calculate reduction amount
    const calculatedReduction = subtotal * couponValue;
    // Calculate taxes
    const calculatedTaxes = subtotal * taxRate;
    // Calculate total
    const calculatedTotal = subtotal - reductionValue + deliveryCost + calculatedTaxes;

    // Set taxes and total
    setReductionValue(calculatedReduction);
    setTaxes(calculatedTaxes);
    setTotal(calculatedTotal);
  }, [total, reductionAmount, deliveryCost]);

  

  const handleSubmit = async () => {
    const quoteObject = {
      packages: clientPackage.reduce((acc, service) => {
        acc[service.name] = {
          qty: service.qty,
          price: service.unit_price,
          total: service.unit_price * service.qty,
          duration: `${service.duration} jours`,
          note: service.description || '',
        };
        return acc;
      }, {}),
      reduction_code: reductionCode || null,
      reduction_amount: reductionAmount || null,
      delivery_address: deliveryAddress || '',
      delivery_duration: deliveryDuration || '',
      delivery_cost: deliveryCost || null,
      taxes: taxes || null,
      total: total,
      client: 1, // Assuming you have a client ID to use
      provider: 2, // Assuming you have a provider ID to use
      store: 3, // Assuming you have a store ID to use
      created_from: 'Website',
      status: 'Draft', // Default status
    };

    try {
      const response = await fetch('/api/quotes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteObject),
      });

      if (response.ok) {
        // Handle successful submission
        console.log('Quote submitted successfully!');
      } else {
        // Handle errors
        console.error('Error submitting quote');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div className=''>
      <div className='px-4'>
        <button 
          onClick={goBack} 
          className="border-2 ml-2 text-white p-1 rounded my-4 text-4xl pr-1 hover:bg-zinc-600"
        >
          <CaretLeftOutlined />
        </button>
        <div className="text-3xl font-bold my-3 px-3">Votre devis personnalisé</div>
        <p className='px-3'>Remplissez le formulaire pour obtenir un devis adapté à vos besoins spécifiques.</p>

        <Cart items={clientPackage} onTotalChange={handleTotalChange} />
        <div className='px-3'>
          <div className='py-3 border-2 rounded-xl text-black space-y-2
           bg-gray-300'>
            <div className='px-3 w-[100%]'>
              <input
                type="text"
                placeholder='Entrez votre code de réduction'
                value={reductionCode}
                onChange={(e) => setReductionCode(e.target.value)}
                className="border rounded px-2 py-1 w-[100%] font-extrabold"
              />
            </div>
            <div className='px-3 flex justify-between items-center'>
              <input
                type="text"
                placeholder='Adresse de livraison'
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="border rounded px-2 py-1 w-[100%]"
              />
            </div>
            <div className='px-3 flex justify-between items-center'>
              <input
                type="text"
                placeholder='Durée de livraison'
                value={deliveryDuration}
                onChange={(e) => setDeliveryDuration(e.target.value)}
                className="border rounded px-2 py-1 w-[100%]"
              />
            </div>

            <div className='px-3 flex justify-between items-center'>
              <div className='bg-gray-100 h-[30px] w-[45%]
                rounded-l px-2 flex items-center font-semibold'
              >Reduction (13%)</div>
              <input
                type="number"
                placeholder='reduction'
                value={reductionValue}
                onChange={(e) => setReductionAmount(parseFloat(e.target.value))}
                className="border rounded-r px-2 py-1 text-black 
                 h-[30px] w-[55%] font-semibold text-right"
              />
            </div>

            <div className='px-3 flex justify-between items-center'>
              <div className='bg-gray-100 h-[30px] w-[45%]
                rounded-l px-2 flex items-center font-semibold'
              >Livraison</div>
              <input
                type="number"
                placeholder='Coût de livraison'
                value={deliveryCost}
                onChange={(e) => setDeliveryCost(parseFloat(e.target.value))}
                className="border rounded-r px-2 py-1 text-black 
                 h-[30px] w-[55%] font-semibold text-right"
              />
            </div>
            <div className='px-3 flex justify-between items-center'>
              <div className='bg-gray-100 h-[30px] w-[45%]
                rounded-l px-2 flex items-center font-semibold'
              >TVA (18%)</div>
              <input
                type="number"
                placeholder='Taxes'
                value={taxes}
                onChange={(e) => setTaxes(parseFloat(e.target.value))}
                className="border rounded-r px-2 py-1 text-black 
                 h-[30px] w-[55%] font-semibold text-right"
              />
            </div>
            <div className='px-3 flex justify-between items-center'>
              <div className='bg-gray-100 h-[30px] w-[45%]
                rounded-l px-2 flex items-center font-semibold'
              >Total en FCFA</div>
              <input
                type="number"
                placeholder='Montant total'
                value={total}
                onChange={(e) => setTotal(parseFloat(e.target.value))}
                className="border rounded-r px-2 py-1 text-black 
                 h-[30px] w-[55%] font-semibold text-right"
                readOnly
              />
            </div>
          </div>
        </div>

        <button 
          onClick={handleSubmit} 
          className="w-[100%] bg-blue-500 text-white py-3 px-5 rounded-lg my-4"
        >
          Soumettre le devis
        </button>
      </div>
    </div>
  );
};

export default QuoteSection;