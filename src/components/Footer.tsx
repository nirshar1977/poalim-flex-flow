
import React from 'react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#D0021B] text-white">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">פועלים פלקס</h3>
            <p className="text-[#FFE6E6] mb-4">
              פתרון חכם למשכנתאות גמישות עם החזרים המותאמים לצרכים האישיים שלך
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-[#FFE6E6]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-[#FFE6E6]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-[#FFE6E6]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">קישורים מהירים</h3>
            <ul className="space-y-2">
              <li><a href="#how-it-works" className="text-gray-100 hover:text-gray-200">איך זה עובד</a></li>
              <li><a href="#benefits" className="text-gray-100 hover:text-gray-200">יתרונות</a></li>
              <li><a href="#calculator" className="text-gray-100 hover:text-gray-200">סימולטור</a></li>
              <li><a href="#faq" className="text-gray-100 hover:text-gray-200">שאלות נפוצות</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">צור קשר</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FFE6E6]">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span className="text-[#FFE6E6]">*2407</span>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FFE6E6]">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span className="text-[#FFE6E6]">support@poalimflex.co.il</span>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FFE6E6]">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="text-[#FFE6E6]">רוטשילד 50, תל אביב</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">הצטרף לעדכונים</h3>
            <p className="text-[#FFE6E6] mb-4">הירשמו לקבלת עדכונים ומבצעים חדשים</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="הכנס מייל" 
                className="bg-white/10 text-white border border-white/20 rounded-md px-4 py-2 w-full placeholder:text-[#FFE6E6]"
              />
              <Button variant="secondary" className="bg-white hover:bg-[#FFE6E6] text-[#D0021B]">
                שלח
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-[#FFE6E6] text-sm">
            © 2025 פועלים פלקס. כל הזכויות שמורות. בנק הפועלים בע"מ.
          </p>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <a href="#" className="text-[#FFE6E6] hover:text-white">תנאי שימוש</a>
            <a href="#" className="text-[#FFE6E6] hover:text-white">מדיניות פרטיות</a>
            <a href="#" className="text-[#FFE6E6] hover:text-white">נגישות</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
