'use client';
import React from 'react';
import { CaretRightOutlined } from '@ant-design/icons';

interface LandingSectionProps {
  goToSocialSection: () => void;
}

const LandingSection: React.FC<LandingSectionProps> = ({ goToSocialSection }) => {
  return (
    <div className="h-[100vh] flex flex-col justify-end pb-[120px] bg-cover bg-center bg-[url('/images/nzi_bg_social_marketing_landing.jpg')]">
      <div className='pt-2 px-6 text-white'>
        <div className='text-3xl font-bold my-3'>Optimisez votre présence numérique avec des services professionnels</div>
        <div className="flex flex-wrap justify-between w-[100%]">
          <div className='w-[100%]'>Découvrez notre gamme complète de services de marketing digital conçus pour accroître votre</div>
          <div className='w-[70%]'>visibilité en ligne et rationaliser vos opérations.</div>
          <div className='w-[30%] flex justify-center pl-4'>
            <button 
              onClick={goToSocialSection} 
              className="w-[80px] h-[80px] text-white rounded-xl mt-[40px] text-[56px] font-semibold flex items-center justify-center border-4 border-white pl-2 hover:bg-gray-500"
            >
              <CaretRightOutlined /> 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingSection;