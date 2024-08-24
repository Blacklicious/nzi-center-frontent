// app/page.tsx
'use client';
import React, { useEffect } from 'react';
import LandingSection from './SectionLanding';
import SocialSection from './SectionPackage';
import PackageSection from './SectionQuote';
import { services, Service } from './DataService';

const Page = () => {
  const [landingSectionToggle, setLandingSectionToggle] = React.useState(true);
  const [socialSectionToggle, setSocialSectionToggle] = React.useState(false);
  const [quoteSectionToggle, setQuoteSectionToggle] = React.useState(false);
  const [clientPackage, setClientPackage] = React.useState<Service[]>([]);

  // Services to initialize in the client package
  const initialServices = [
    'conception_image',
    'conception_video',
    'automatisation_publications',
    'rapport_campagne',
  ];

  useEffect(() => {
    // Initialize client package with specific services
    const initialPackage = initialServices.map(serviceKey => services[serviceKey]);
    setClientPackage(initialPackage);
  }, []);
  console.log(clientPackage);
  const handleServiceChange = (serviceKey: string, isChecked: boolean) => {
    if (isChecked) {
      setClientPackage((prev) => [...prev, services[serviceKey]]);
    } else {
      setClientPackage((prev) => prev.filter(service => service.id !== services[serviceKey].id));
    }
  };

  const goToLandingSection = () => {
    setLandingSectionToggle(true);
    setSocialSectionToggle(false);
    setQuoteSectionToggle(false);
  };

  const goToSocialSection = () => {
    setLandingSectionToggle(false);
    setSocialSectionToggle(true);
    setQuoteSectionToggle(false);
  };

  const goToQuoteSection = () => {
    setLandingSectionToggle(false);
    setSocialSectionToggle(false);
    setQuoteSectionToggle(true);
  };

  const goBack = () => {
    if (quoteSectionToggle) {
      setQuoteSectionToggle(false);
      setSocialSectionToggle(true);
    } else if (socialSectionToggle) {
      setSocialSectionToggle(false);
      setLandingSectionToggle(true);
    }
  };

  return (
    <div className='bg-gray-900 text-white'>
      {landingSectionToggle && <LandingSection goToSocialSection={goToSocialSection} />}
      {socialSectionToggle && (
        <SocialSection 
          goBack={goBack} 
          goToQuoteSection={goToQuoteSection} 
          handleServiceChange={handleServiceChange}
          clientPackage={clientPackage}  // Pass the clientPackage to the SocialSection component
          setClientPackage={setClientPackage} 
        />
      )}
      {quoteSectionToggle && <PackageSection clientPackage={clientPackage} goBack={goBack} />}
    </div>
  );
};

export default Page;