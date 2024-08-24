import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

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

const PackagesPage = () => {
  const params = useParams();
  const managerId = params.managerId;
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    if (managerId) {
      // Fetch the packages associated with the manager
      fetch(`/api/managers/${managerId}/packages`)
        .then((response) => response.json())
        .then((data) => setPackages(data))
        .catch((error) => console.error('Error fetching packages:', error));
    }
  }, [managerId]);

  return (
    <div>
      <h1>Packages for Manager {managerId}</h1>
      <ul>
        {packages.map((pkg) => (
          <li key={pkg.id}>
            <Link href={`/managers/${managerId}/packages/edit/${pkg.id}`}>
              <a>{pkg.name} - {pkg.price} - {pkg.status}</a>
            </Link> (Store ID: {pkg.store})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PackagesPage;