
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: "זיהוי תקופות עומס פיננסי",
      description: "מערכת AI מזהה תקופות צפויות שבהן הלקוח עלול להתקשות בתשלומים על סמך היסטוריית הוצאות ודפוסי חיוב.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-poalim-blue">
          <path d="M12 2a10 10 0 1 0 10 10H12V2Z"></path>
          <path d="M21 12a9 9 0 0 0-9-9v9h9Z"></path>
          <circle cx="12" cy="12" r="4"></circle>
        </svg>
      )
    },
    {
      id: 2,
      title: "התראה חכמה",
      description: "לקוחות מקבלים התראה לפני תשלום גבוה עם הצעה להקטין את תשלום המשכנתא ולהחזיר את ההפרש בחודשים הבאים.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-poalim-blue">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
        </svg>
      )
    },
    {
      id: 3,
      title: "בחירת סכום להקטנה",
      description: "הלקוח בוחר סכום להקטנה בלחיצה אחת, והפריסה נעשית אוטומטית עם חישוב מחדש של הריבית בהתאם למסלול שלו.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-poalim-blue">
          <path d="M3 3v18h18"></path>
          <path d="m19 9-5 5-4-4-3 3"></path>
        </svg>
      )
    },
    {
      id: 4,
      title: "מודל גמיש",
      description: "אפשרות לבחור עד 3-4 חודשים בשנה להפחתת תשלום וגם להגדיל תשלומים בחודשים חזקים להפחתת סך הריבית הכוללת.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-poalim-blue">
          <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1.5"></path>
          <path d="M16 2v4"></path>
          <path d="M8 2v4"></path>
          <path d="M3 10h18"></path>
        </svg>
      )
    }
  ];

  return (
    <section id="how-it-works" className="section-container bg-white border-b border-poalim-border">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-poalim-text mb-4">איך <span className="text-poalim-red">פועלים פלקס</span> עובד?</h2>
        <p className="text-poalim-text/80 max-w-2xl mx-auto">
          פועלים פלקס מאפשר לך לנהל את תשלומי המשכנתא שלך באופן גמיש, המותאם לצרכים הפיננסיים המשתנים שלך
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <Card key={step.id} className="border-none hover:border-poalim-red/20 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-poalim-light p-4 rounded-full mb-4">
                {React.cloneElement(step.icon as React.ReactElement, { className: 'w-10 h-10 text-poalim-red' })}
              </div>
              <div className="bg-poalim-red text-white h-8 w-8 rounded-full flex items-center justify-center font-bold mb-4">
                {step.id}
              </div>
              <h3 className="text-xl font-bold text-poalim-text mb-2">{step.title}</h3>
              <p className="text-poalim-text/80">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
