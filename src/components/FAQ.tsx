
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "כמה פעמים בשנה אפשר להשתמש בשירות פועלים פלקס?",
      answer: "ניתן להשתמש בשירות עד 3 פעמים בשנה, בהתאם למסלול המשכנתא שלך ולהיסטוריית התשלומים."
    },
    {
      question: "האם הפחתת התשלומים משפיעה על תקופת המשכנתא הכוללת?",
      answer: "לא, השירות לא משנה את משך המשכנתא הכולל. במקום זאת, ההפרש מתשלומי המשכנתא המופחתים יתחלק על פני מספר החודשים שתבחר."
    },
    {
      question: "האם יש עלות לשימוש בשירות?",
      answer: "אין עלות ישירה לשימוש בשירות, אך ייתכן ותשלם ריבית מעט גבוהה יותר על הסכום שנפרס מחדש, בהתאם למסלול המשכנתא שלך."
    },
    {
      question: "האם כל לקוח יכול להשתמש בשירות פועלים פלקס?",
      answer: "השירות זמין ללקוחות עם היסטוריית תשלומים תקינה, לאחר 12 חודשי תשלום רצופים של משכנתא."
    },
    {
      question: "איך המערכת יודעת מתי אני עלול להתקשות בתשלומים?",
      answer: "המערכת מנתחת את דפוסי ההוצאות וההכנסות שלך, ומזהה תקופות שבהן היו לך בעבר הוצאות גבוהות או הכנסות נמוכות יותר. היא משתמשת במידע זה כדי לחזות תקופות עומס פיננסי עתידיות."
    },
    {
      question: "האם אפשר להגדיל תשלומים בחודשים מסוימים כדי להפחית את סך הריבית?",
      answer: "בהחלט! השירות מאפשר גם להגדיל תשלומים בחודשים שבהם יש לך יותר הכנסות, מה שיכול להפחית את סך הריבית הכוללת על המשכנתא שלך."
    }
  ];

  return (
    <section id="faq" className="section-container bg-poalim-gray">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-poalim-darkText mb-4">שאלות נפוצות</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          תשובות לשאלות הנפוצות ביותר על פועלים פלקס
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="bg-white rounded-xl overflow-hidden card-shadow">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-poalim-lightBorder">
              <AccordionTrigger className="px-6 py-4 hover:bg-poalim-lightRed/30 text-right font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
