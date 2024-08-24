import { useState, useEffect } from 'react';
import { useSearchParams, useParams, useRouter } from 'next/navigation';

interface Package {
  id: number;
  name: string;
  description: string;
  cart: any; // Assuming `cart` is a JSON object, this could be more specific
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

const EditPackagePage = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const managerId = params.managerId;
  const packageId = params.id;

  const [formData, setFormData] = useState<Package>({
    id: 0,
    name: '',
    description: '',
    cart: null,
    discount: null,
    price: null,
    duration: '',
    features: '',
    availability: '',
    created_from: '',
    status: 'Draft',
    store: null,
    author: null,
  });

  useEffect(() => {
    if (packageId) {
      // Fetch the package data for editing
      fetch(`/api/managers/${managerId}/packages/${packageId}`)
        .then((response) => response.json())
        .then((data) => setFormData(data))
        .catch((error) => console.error('Error fetching package:', error));
    }
  }, [packageId, managerId]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch(`/api/managers/${managerId}/packages/${packageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        // Redirect to the package list page after successful update
        router.push(`/managers/${managerId}/packages`);
      })
      .catch((error) => console.error('Error updating package:', error));
  };

  return (
    <div>
      <h1>Edit Package</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
        </div>
        <div>
          <label>Cart (JSON format):</label>
          <textarea
            name="cart"
            value={formData.cart ? JSON.stringify(formData.cart, null, 2) : ''}
            onChange={handleChange}
            placeholder="Enter valid JSON"
          ></textarea>
        </div>
        <div>
          <label>Price:</label>
          <input type="number" step="0.01" name="price" value={formData.price ?? ''} onChange={handleChange} />
        </div>
        <div>
          <label>Discount:</label>
          <input type="number" step="0.01" name="discount" value={formData.discount ?? ''} onChange={handleChange} />
        </div>
        <div>
          <label>Duration:</label>
          <input type="text" name="duration" value={formData.duration ?? ''} onChange={handleChange} required />
        </div>
        <div>
          <label>Features:</label>
          <textarea name="features" value={formData.features} onChange={handleChange}></textarea>
        </div>
        <div>
          <label>Availability:</label>
          <input type="text" name="availability" value={formData.availability} onChange={handleChange} />
        </div>
        <div>
          <label>Created From:</label>
          <input type="text" name="created_from" value={formData.created_from} onChange={handleChange} />
        </div>
        <div>
          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>
        <div>
          <label>Store ID:</label>
          <input type="number" name="store" value={formData.store ?? ''} onChange={handleChange} required />
        </div>
        <div>
          <label>Author ID:</label>
          <input type="number" name="author" value={formData.author ?? ''} onChange={handleChange} required />
        </div>
        <button type="submit">Update Package</button>
      </form>
    </div>
  );
};

export default EditPackagePage;