
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const BenefitsSection: React.FC = () => {
  const customerBenefits = [
    {
      title: "ביטחון פיננסי",
      description: "אפשרות להקטין תשלומים בתקופות קשות מבלי לפגוע בהיסטוריית האשראי",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-poalim-teal">
          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
          <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
        </svg>
      )
    },
    {
      title: "גמישות כלכלית",
      description: "התאמת ההחזר החודשי לתנודות במצב הפיננסי האישי וחסכון בהלוואות נוספות",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-poalim-teal">
          <path d="M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"></path>
          <path d="M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"></path>
          <path d="M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12"></path>
          <path d="M22 9c-4.29 1-7.6-6.51-8-9-2.92 4-4.18 10-4 19 2.33-1.67 5.67-1.67 8 0"></path>
        </svg>
      )
    },
    {
      title: "שקט נפשי",
      description: "ניהול תקציב יעיל יותר ללא חשש מפיגור בתשלומים בתקופות עמוסות",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-poalim-teal">
          <rect width="20" height="14" x="2" y="5" rx="2"></rect>
          <line x1="2" x2="22" y1="10" y2="10"></line>
          <line x1="6" x2="6.01" y1="14" y2="14"></line>
          <line x1="10" x2="10.01" y1="14" y2="14"></line>
        </svg>
      )
    }
  ];

  const bankBenefits = [
    {
      title: "הגדלת נאמנות לקוחות",
      description: "לקוחות שנהנים מגמישות תשלומים נשארים נאמנים לבנק",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-poalim-blue">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
        </svg>
      )
    },
    {
      title: "הפחתת סיכוני אשראי",
      description: "שיפור אחוז העמידה בהחזרים והקטנת הסיכון לפיגורים",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-poalim-blue">
          <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10"></path>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
      )
    },
    {
      title: "הגדלת הכנסות מריבית",
      description: "הכנסות נוספות מריבית על הסכומים שנפרסו מחדש",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-poalim-blue">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
          <path d="M12 18V6"></path>
        </svg>
      )
    }
  ];

  return (
    <section id="benefits" className="section-container bg-white border-b border-poalim-border">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-poalim-text mb-4">למה <span className="text-poalim-red">פועלים פלקס</span>?</h2>
        <p className="text-poalim-text/80 max-w-2xl mx-auto">
          פועלים פלקס מציע יתרונות משמעותיים הן ללקוחות והן לבנק
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-poalim-red mb-6 text-center">יתרונות ללקוחות</h3>
          <div className="space-y-4">
            {customerBenefits.map((benefit, index) => (
              <Card key={index} className="border-none hover:border-poalim-red/20 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex items-start">
                  <div className="bg-poalim-light p-3 rounded-full mr-4">
                    {React.cloneElement(benefit.icon as React.ReactElement, { className: 'w-10 h-10 text-poalim-red' })}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-poalim-text mb-2">{benefit.title}</h4>
                    <p className="text-poalim-text/80">{benefit.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold text-poalim-red mb-6 text-center">יתרונות לבנק</h3>
          <div className="space-y-4">
            {bankBenefits.map((benefit, index) => (
              <Card key={index} className="border-none hover:border-poalim-red/20 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex items-start">
                  <div className="bg-poalim-light p-3 rounded-full mr-4">
                    {React.cloneElement(benefit.icon as React.ReactElement, { className: 'w-10 h-10 text-poalim-red' })}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-poalim-text mb-2">{benefit.title}</h4>
                    <p className="text-poalim-text/80">{benefit.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
