
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import PaymentCalculator from '@/components/PaymentCalculator';
import BenefitsSection from '@/components/BenefitsSection';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <HowItWorks />
        <PaymentCalculator />
        <BenefitsSection />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
