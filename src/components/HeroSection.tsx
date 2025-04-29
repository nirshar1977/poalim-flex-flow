
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { getUser, getDefaultUser, UserMortgageProfile } from '@/services/mockUserData';

const HeroSection: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserMortgageProfile>(getDefaultUser());
  
  // Listen for custom events to update the user data when selection changes in the simulator
  useEffect(() => {
    const handleUserChange = (event: CustomEvent) => {
      const userId = event.detail?.userId;
      if (userId) {
        const user = getUser(userId);
        if (user) {
          setCurrentUser(user);
        }
      }
    };

    // Add event listener
    window.addEventListener('userSelectionChanged' as any, handleUserChange);

    // Cleanup
    return () => {
      window.removeEventListener('userSelectionChanged' as any, handleUserChange);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="gradient-bg">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-poalim-darkText leading-tight">
              החזרי משכנתא גמישים
              <span className="block text-poalim-red">בהתאמה אישית</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-lg">
              פתרון חכם להקטנת תשלומי המשכנתא בתקופות עמוסות פיננסית,
              עם פריסה חכמה לאורך יתרת תקופת ההלוואה
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-poalim-red hover:bg-poalim-red/90"
                onClick={() => scrollToSection('how-it-works')}
              >
                לקבל פרטים נוספים
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg"
                variant="outline" 
                className="border-poalim-red text-poalim-red hover:bg-poalim-lightRed"
                onClick={() => scrollToSection('calculator')}
              >
                קח אותי לסימולטור
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -z-10 w-72 h-72 bg-poalim-red/20 rounded-full -right-10 -top-10 blur-3xl"></div>
              <div className="absolute -z-10 w-72 h-72 bg-poalim-red/10 rounded-full -left-10 -bottom-10 blur-3xl"></div>
              <div className="bg-white p-6 rounded-2xl card-shadow">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-poalim-darkText">תשלום משכנתא חודשי</h3>
                    <p className="text-sm text-gray-500">תשלום גמיש עבור {currentUser.name}</p>
                  </div>
                  <div className="bg-poalim-lightRed p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-poalim-red">
                      <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1.5"></path>
                      <path d="M16 2v4"></path>
                      <path d="M8 2v4"></path>
                      <path d="M3 10h18"></path>
                      <path d="M18 21v-5.5c0-1.1-.9-2-2-2h-1.5"></path>
                      <path d="M9.5 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
                      <path d="M14.195 16.055c-.532-.47-1.232-.465-1.75 0"></path>
                    </svg>
                  </div>
                </div>

                <div className="bg-poalim-gray rounded-xl p-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">תשלום רגיל:</span>
                    <span className="font-bold">{currentUser.currentPayment} ₪</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-poalim-red font-medium">תשלום מופחת Flex:</span>
                    <span className="font-bold text-xl text-poalim-red">{currentUser.currentPayment - currentUser.recommendedReduction!} ₪</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-green-500 text-sm">חיסכון חודשי:</span>
                    <span className="font-bold text-green-500">{currentUser.recommendedReduction} ₪</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">פריסת ההפרש</h4>
                  <p className="text-xs text-gray-500">ההפרש בסך {currentUser.recommendedReduction} ש"ח יתחלק שווה על פני 12 החודשים הבאים</p>
                </div>

                <Button 
                  className="w-full bg-poalim-red hover:bg-poalim-red/90"
                  onClick={() => scrollToSection('calculator')}
                >
                  קח אותי לסימולטור
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
