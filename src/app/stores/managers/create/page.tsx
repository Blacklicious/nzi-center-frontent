'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cart from './Cart';

const CreatePackagePage = ({ services }: { services: any[] }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cart: null, // Cart will be managed as a JSON object or array
    discount: null,
    price: null,
    duration: null,
    features: '',
    availability: '',
    created_from: '',
    status: 'Draft',
    store: null,
    author: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Handle number and JSON fields appropriately
    if (name === 'price' || name === 'discount') {
      setFormData({
        ...formData,
        [name]: value === '' ? null : parseFloat(value),
      });
    } else if (name === 'cart') {
      setFormData({
        ...formData,
        [name]: value === '' ? null : JSON.parse(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleCartChange = (cart: any) => {
    setFormData({
      ...formData,
      cart,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch(`/api/packages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Redirect to the package list page after successful creation
        router.push(`/managers/${formData.author}/packages`);
      })
      .catch((error) => console.error('Error creating package:', error));
  };

  return (
    <div className='p-2'>
      <form onSubmit={handleSubmit} className='w-[100%]'>
        <div className='w-[100%]'>
          <input type="text" className='w-[100%] h-[40px] px-2 mt-2'
            placeholder='Campagne Marketing Digitale 202408161936000' name="name"
            value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <textarea name="description"  className='w-[100%] h-[40px] px-2 mt-2'
            placeholder='Description' value={formData.description} onChange={handleChange}></textarea>
        </div>
        <div>
          <Cart services={services} onCartChange={handleCartChange} />
        </div>
        <div>
          <input type="number" step="0.01" name="discount" className='w-[100%] h-[40px] px-2 mt-2'
            placeholder='Discount'   value={formData.discount ?? ''} onChange={handleChange} />
        </div>
        <div>
          <input type="number" step="0.01" name="price" className='w-[100%] h-[40px] px-2 mt-2'
            placeholder='Price'  value={formData.price ?? ''} onChange={handleChange} />
        </div>
        <div>
          <input type="text" name="duration"  className='w-[100%] h-[40px] px-2 mt-2'
            placeholder='Durée totalte'  value={formData.duration ?? ''} onChange={handleChange} required />
        </div>
        <div>
          <div className='w-[100%] text-right mt-2'>Availability: 2 / 3</div>
        </div>
        <button className='bg-blue-200 h-[40px] w-[100%] mt-2' type="submit">Continuer</button>
      </form>
    </div>
  );
};

export default CreatePackagePage;