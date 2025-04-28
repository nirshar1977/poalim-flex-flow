
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2 text-sm">
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-poalim-blue">International</a>
            <a href="#" className="text-gray-600 hover:text-poalim-blue">العربية</a>
            <a href="#" className="text-gray-600 hover:text-poalim-blue">יצירת קשר</a>
            <a href="#" className="text-gray-600 hover:text-poalim-blue">סניפים</a>
            <a href="#" className="text-gray-600 hover:text-poalim-blue">חיפוש</a>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-poalim-blue">Poalim Wonder</a>
            <a href="#" className="text-gray-600 hover:text-poalim-blue">חטיבה עסקית</a>
            <a href="#" className="text-gray-600 hover:text-poalim-blue">לקוח עסקי</a>
            <a href="#" className="text-gray-600 hover:text-poalim-blue">לקוח פרטי</a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <div className="text-poalim-red font-bold text-2xl">
              בנק הפועלים
            </div>
            <nav className="hidden lg:flex gap-6">
              <NavDropdown text="הצטרפות לבנק">
                <Button 
                  variant="destructive" 
                  className="bg-poalim-red hover:bg-poalim-red/90 text-white font-medium"
                >
                  <span>כניסה לחשבון</span>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                </Button>
              </NavDropdown>
              <NavDropdown text="משכנתא" />
              <NavDropdown text="ייעוץ פיננסי" />
              <NavDropdown text="שוק ההון" />
              <NavDropdown text="מטבע חוץ" />
              <NavDropdown text="כרטיסי אשראי" />
              <NavDropdown text="פיקדונות וחסכונות" />
              <NavDropdown text="הלוואות" />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavDropdownProps {
  text: string;
  children?: React.ReactNode;
}

const NavDropdown: React.FC<NavDropdownProps> = ({ text, children }) => {
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 text-gray-700 hover:text-poalim-blue py-2">
        {text}
        <ChevronLeft className="h-4 w-4" />
      </button>
      {children && (
        <div className="absolute top-full right-0 bg-white shadow-lg rounded-md p-4 hidden group-hover:block min-w-[200px]">
          {children}
        </div>
      )}
    </div>
  );
};

export default Navbar;
