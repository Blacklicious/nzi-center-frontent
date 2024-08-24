'use client';
import React, { useEffect } from 'react';
import { CaretLeftOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { networks } from './DataNetworks';
import { Service, services } from './DataService';

interface SocialSectionProps {
  goBack: () => void;
  goToQuoteSection: () => void;
  handleServiceChange: (serviceKey: string, isChecked: boolean) => void;
  clientPackage: Service[]; // Pass the clientPackage as a prop
  setClientPackage: React.Dispatch<React.SetStateAction<Service[]>>; // Function to update the clientPackage
}

const defaultSelectedServices = [
  'conception_image',
  'conception_video',
  'automatisation_publications',
  'rapport_campagne',
];

const SocialSection: React.FC<SocialSectionProps> = ({ goBack, goToQuoteSection, clientPackage, setClientPackage }) => {
  useEffect(() => {
    // Initialize client package with the default selected services
    defaultSelectedServices.forEach((serviceKey) => {
      if (!clientPackage.some(service => service.id === services[serviceKey].id)) {
        setClientPackage(prev => [...prev, services[serviceKey]]);
      }
    });
  }, []); // Run once on component mount

  const handleServiceChange = (serviceKey: string, isChecked: boolean) => {
    const service = services[serviceKey];

    if (isChecked) {
      // Add the service to clientPackage if it's not already there
      if (!clientPackage.some(s => s.id === service.id)) {
        setClientPackage([...clientPackage, service]);
      }
    } else {
      // Remove the service from clientPackage
      setClientPackage(clientPackage.filter(s => s.id !== service.id));
    }
  };

  return (
    <div className="py-2 px-6 bg-black h-[100vh]">
      <button 
        onClick={goBack} 
        className="border-2 ml-2 text-white p-1 rounded my-4 text-4xl pr-1 hover:bg-zinc-600"
      >
        <CaretLeftOutlined />
      </button>
      <div>
        <div className='text-xl font-semibold'>
          Choisissez les réseaux sur lesquels vous souhaitez être présent.
        </div>
        <div className='text-xs text-gray-500'>(Vous pouvez sélectionner plusieurs options.)</div>
        <div className="flex flex-col space-y-6 mt-4 py-3 px-2 h-[58vh] overflow-auto rounded-xl bg-white">
          {networks.map((network, index) => (
            <div key={index} className={`bg-cover bg-center rounded-xl`} style={{ backgroundImage: `url(${network.backgroundImage})` }}>
              <div className='w-[100%] p-3 space-y-2 bg-black/70 border-2 rounded-xl text-black shadow-md'>
                <div className='text-xl font-medium text-white'>{network.name}</div>
                {network.channels.map((channel, idx) => (
                  <div key={idx} className='p-1 w-[100%] bg-white/90 rounded-md flex justify-between'>
                    <div className='bg-gray-300 w-[40px] h-[40px] flex items-center rounded-lg'>
                      <Image
                        src={channel.logo}
                        alt={`${channel.name} Logo`}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <label className="flex w-[86%] items-center font-semibold px-2 justify-between">
                      <span>{channel.name}</span>
                      <input
                        type="checkbox"
                        className="form-checkbox w-[18px] h-[18px]"
                        disabled={channel.disabled}
                        onChange={(e) => handleServiceChange(channel.serviceKey, e.target.checked)}
                        checked={clientPackage.some(service => service.id === services[channel.serviceKey].id)}
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <button 
        onClick={goToQuoteSection} 
        className="w-[100%] border-2 text-white py-3 px-5 rounded-lg my-4
          text-xl font-semibold hover:bg-white/70"
      >
        Obtenez un devis
      </button>
    </div>
  );
};

export default SocialSection;