'use client';
import { useEffect, useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  description: string;
  qty: number;
  qty_note: { status: string, [key: string]: string };
  duration: number;
  duration_original: number; // Original duration
  duration_note: { status: string, [key: string]: string }; 
  unit_price: number;
  pricing_model: string;
  delivery: string;
  cost: number;
  note: string;
}

interface CartProps {
  items: CartItem[]; // Define the type for the items prop
  onTotalChange: (total: number) => void; // Callback to update the total in the parent component
}

const Cart = ({ items, onTotalChange }: CartProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Initialize cart with items data
    const initialItems = items.map((item, index) => ({
      id: item.id || Date.now() + index, // Ensure each item has a unique ID
      name: item.name,
      description: item.description,
      qty: item.qty || 1,
      qty_note: item.qty_note || {},
      duration: item.duration || 0,
      duration_original: item.duration_original || 0, // Original duration
      duration_note: item.duration_note || {},
      unit_price: item.unit_price || 0,
      pricing_model: item.pricing_model || '',
      delivery: item.delivery || '',
      cost: item.unit_price * (item.qty || 1),
      note: item.note || '',
    }));
    setCartItems(initialItems);
    calculateTotal(initialItems);
  }, [items]);

  const calculateTotal = (items: CartItem[]) => {
    const total = items.reduce((acc, item) => acc + item.cost, 0);
    onTotalChange(total); // Pass the calculated total to the parent component
  };

  const handleChange = (id: number, field: keyof CartItem, value: string | number) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id) {
        let updatedItem: CartItem = { ...item, [field]: value };
        if (field === 'qty') {
          const qty: number = value as number;
          const qtyNote = item.qty_note;
          const originalDuration = item.duration_original;
          let multiplier = 1;

          // Calculate new duration based on qty_note
          if (qtyNote.status === 'active') {
            const keys = Object.keys(qtyNote)
              .filter((key) => key !== 'status')
              .map((key) => parseInt(key, 10))
              .sort((a, b) => a - b);

            for (let i = 0; i < keys.length; i++) {
              if (qty <= keys[i]) {
                multiplier = parseFloat(qtyNote[keys[i]]);
                break;
              } else {
                multiplier = parseFloat(qtyNote[keys[keys.length - 1]]) || 1;
              }
            }
            updatedItem.duration = originalDuration * multiplier;
          }
          updatedItem.cost = item.unit_price * qty;
        }

        if (field === 'duration') {
          // Calculate new cost based on duration_note
          const duration: number = value as number;
          const durationNote = item.duration_note;
          let multiplier = 1;

          if (durationNote['status'] === 'active') {
            const keys = Object.keys(durationNote)
              .filter((key) => key !== 'status')
              .map((key) => parseInt(key, 10))
              .sort((a, b) => a - b);

            for (let i = 0; i < keys.length; i++) {
              if (duration < keys[i]) {
                multiplier = parseFloat(durationNote[keys[i]]) || 1;
                break;
              } else {
                multiplier = parseFloat(durationNote[keys[keys.length - 1]]) || 1;
              }
            }
            updatedItem.cost = item.unit_price * item.qty * multiplier;
          } else {
            updatedItem.cost = item.unit_price * item.qty;
          }
        }

        return updatedItem;
      }
      return item;
    });

    setCartItems(updatedItems);
    calculateTotal(updatedItems); // Recalculate the total after updates
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className='px-4'>
      <div className='h-[65vh] overflow-auto px-3 bg-white my-6 rounded-2xl' style={{ boxShadow: 'inset 0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        {cartItems.map((item) => (
          <div key={item.id} className="my-4 px-3 pb-3 pt-2 rounded-xl text-black flex justify-between flex-wrap items-center bg-gray-400/60 h-max shadow-md">
            <div className='w-[100%] h-[26px] mb-2 border-b-[2px] px-2 border-gray-300 font-semibold'>{item.name}</div>
            <div className='w-[100%] flex justify-between items-center'>
              <div className='bg-gray-700 w-[38%] h-[138px] rounded px-2'></div>
              <div className='w-[60%] h-[100%]'>
                <div className='w-[100%] mb-2 text-[12px] px-2'>{truncateText(item.description, 55)}</div>
                <div className='w-[100%] flex flex-wrap justify-between items-center bg-white rounded text-[13px] mb-2'>
                  <div className='w-[100%] flex items-center'>
                    <input
                      type="number"
                      className="w-[60%] h-[25px] px-2 rounded-l text-right"
                      value={item.qty}
                      onChange={(e) => {
                        if (item.qty_note.status === 'active') {
                          handleChange(item.id, 'qty', parseInt(e.target.value));
                        }
                      }}
                      disabled={item.qty_note.status === 'disable'}
                    />
                    <div className='w-[40%] h-[25px] bg-gray-300/70 font-medium px-2 rounded-r flex items-center'>{item.pricing_model}</div>
                  </div>
                </div>
                <div className='w-[100%] flex justify-between items-center bg-white rounded text-[13px]'>
                  <div className='w-[100%] flex items-center'>
                    <input
                      type="number"
                      className="w-[60%] h-[25px] px-2 rounded-l text-right"
                      value={item.duration}
                      onChange={(e) => {
                        if (item.duration_note.status === 'active') {
                          handleChange(item.id, 'duration', parseInt(e.target.value));
                        }
                      }}
                      disabled={item.duration_note.status === 'disable'}
                    />
                    <div className='w-[40%] h-[25px] bg-gray-300/70 font-medium px-2 rounded-r flex items-center'>jour(s)</div>
                  </div>
                </div>
                <div className='w-[100%] mt-2'>
                  <input
                    type="text"
                    className="w-[100%] h-[25px] px-2 rounded text-[15px] text-center hidden"
                    placeholder='Enter delivery here'
                    value={item.delivery}
                    onChange={(e) => handleChange(item.id, 'delivery', e.target.value)}
                  />
                </div>
                <div className='w-[100%] h-[25px] text-[14px] font-semibold mt-2 flex justify-end items-center px-3 bg-white rounded'>
                  {item.cost} FCFA
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;