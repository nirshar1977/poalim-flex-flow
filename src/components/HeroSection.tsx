import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="space-y-6 text-right">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-poalim-navy leading-tight">
                <span className="text-poalim-red">החזרי משכנתא</span>
                <br />
                גמישים לחיים משתנים
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-lg">
                פתרון חכם להקטנת תשלומי המשכנתא בתקופות עמוסות פיננסית,
                עם פריסה חכמה לאורך יתרת תקופת ההלוואה
              </p>
              <div className="flex flex-wrap gap-4 pt-4 justify-start">
                <Button 
                  size="lg" 
                  className="bg-poalim-red hover:bg-poalim-red/90 text-white font-medium"
                >
                  למצטרפים חדשים לבנק הפועלים
                  <ChevronLeft className="mr-2 h-4 w-4" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline" 
                  className="border-poalim-red text-poalim-red hover:bg-poalim-red/10"
                >
                  לפרטים נוספים
                </Button>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -z-10 w-72 h-72 bg-poalim-red/10 rounded-full -right-10 -top-10 blur-3xl"></div>
              <div className="absolute -z-10 w-72 h-72 bg-poalim-red/10 rounded-full -left-10 -bottom-10 blur-3xl"></div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-poalim-navy">תשלום משכנתא חודשי</h3>
                    <p className="text-sm text-gray-500">תשלום גמיש עבור 15/09/2025</p>
                  </div>
                  <div className="bg-poalim-red/10 p-2 rounded-full">
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

                <div className="bg-poalim-red/5 rounded-xl p-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">תשלום רגיל:</span>
                    <span className="font-bold text-poalim-navy">₪5,200</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-poalim-red font-medium">תשלום מופחת Flex:</span>
                    <span className="font-bold text-xl text-poalim-red">₪3,700</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-poalim-red text-sm">חיסכון חודשי:</span>
                    <span className="font-bold text-poalim-red">₪1,500</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">פריסת ההפרש</h4>
                  <p className="text-xs text-gray-500">ההפרש בסך 1,500 ש"ח יתחלק שווה על פני 12 החודשים הבאים</p>
                </div>

                <Button className="w-full bg-poalim-red hover:bg-poalim-red/90 text-white">
                  אישור ההפחתה
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
