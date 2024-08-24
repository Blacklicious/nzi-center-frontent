'use client';
import { useParams, usePathname } from 'next/navigation';
import PackagesPage from './Index'; // Assuming the index.tsx file is in the same directory
import CreatePackagePage from './create/page';
import EditPackagePage from './Edit';
import { useState } from 'react';

interface Package {
  id: number;
  name: string;
  description: string;
  cart: any; // Assuming `cart` is a JSON object
  discount: number | null;
  price: number | null;
  duration: string;
  features: string;
  availability: string;
  created_from: string;
  status: string;
  store: number | null;
  author: number | null;
}

// Example services data. Replace this with actual data fetching or props passing.
const services = [
  { id: 1, name: 'Service 1', description: 'Description 1', qty: 1, duration: 1, duration_note: "{'10':'2','20':'1.5','35':'1'}",
		qty_note: "{'5':'1.5','10':'2','30':'3'}", pricing_model: 'Model 1', cost: 100 },
  { id: 2, name: 'Service 2', description: 'Description 2', qty: 1, duration: 1, duration_note: "{'10':'2','20':'1.5','35':'1'}",
		qty_note: "{'5':'1.5','10':'2','30':'3'}", pricing_model: 'Model 2', cost: 200 },
	{ id: 3, name: 'Service 3', description: 'Description 3', qty: 1, duration: 1, duration_note: "{'10':'2','20':'1.5','35':'1'}",
		qty_note: "{'5':'1.5','10':'2','30':'3'}", pricing_model: 'Model 3', cost: 300 },
];

const PackagesManagementPage = () => {
  const params = useParams();
  const managerId = params.managerId;
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const handleCreate = () => {
    setView('create');
    setSelectedPackage(null);
  };

  const handleEdit = (pkg: Package) => {
    setSelectedPackage(pkg);
    setView('edit');
  };

  const handleCancel = () => {
    setView('list');
    setSelectedPackage(null);
  };

  const handleSave = (pkg: Package) => {
    if (view === 'create') {
      // Save the newly created package
      fetch(`/api/packages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pkg),
      })
        .then((response) => response.json())
        .then(() => {
          setView('list');
        })
        .catch((error) => console.error('Error creating package:', error));
    } else if (view === 'edit' && selectedPackage) {
      // Save the edited package
      fetch(`/api/managers/${managerId}/packages/${selectedPackage.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pkg),
      })
        .then(() => {
          setView('list');
        })
        .catch((error) => console.error('Error updating package:', error));
    }
  };

  return (
    <div>
        <div className='my-4 bg-black/30 p-4'>< CreatePackagePage services={services} /></div>
        <div className='my-4 bg-black/30 p-4'>< EditPackagePage /></div>
        <div className='my-4 bg-black/30 p-4'>< PackagesPage /></div>
    </div>
  );
};

export default PackagesManagementPage;