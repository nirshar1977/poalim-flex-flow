
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  return (
    <header className="py-4 bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="font-bold text-xl flex items-center gap-1">
            <span className="text-poalim-red">בנק</span>
            <span className="text-poalim-red">הפועלים</span>
          </div>
        </div>
        
        <nav className="hidden md:flex gap-6">
          <NavLink href="#how-it-works">איך זה עובד</NavLink>
          <NavLink href="#benefits">יתרונות</NavLink>
          <NavLink href="#calculator">סימולטור</NavLink>
          <NavLink href="#faq">שאלות נפוצות</NavLink>
        </nav>
        
        <div>
          <Button 
            size="sm" 
            className="bg-poalim-red hover:bg-poalim-red/90 transition-colors"
          >
            לחץ להתחיל
          </Button>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, className }) => {
  return (
    <a 
      href={href} 
      className={cn(
        "text-gray-600 hover:text-poalim-red font-medium transition-colors",
        className
      )}
    >
      {children}
    </a>
  );
};

export default Navbar;
