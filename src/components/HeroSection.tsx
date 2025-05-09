import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import {
  getUser,
  getDefaultUser,
  UserMortgageProfile,
} from "@/services/mockUserData";

const HeroSection: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserMortgageProfile>(
    getDefaultUser()
  );
  const [reducedPayment, setReducedPayment] = useState(
    currentUser.currentPayment - (currentUser.recommendedReduction || 0)
  );
  const [recommendedReduction, setRecommendedReduction] = useState(
    currentUser.recommendedReduction || 0
  );
  const [postponeMonths, setPostponeMonths] = useState(1);
  const [flexUsedThisYear, setFlexUsedThisYear] = useState(
    currentUser.flexUsedThisYear
  );
  const [maxFlexPerYear, setMaxFlexPerYear] = useState(3);
  const [remainingFlexCount, setRemainingFlexCount] = useState(
    maxFlexPerYear - flexUsedThisYear
  );
  const [effectiveRemainingFlexCount, setEffectiveRemainingFlexCount] =
    useState(remainingFlexCount - postponeMonths);

  // Listen for custom events to update the user data when selection changes in the simulator
  useEffect(() => {
    const handleUserChange = (event: CustomEvent) => {
      const userId = event.detail?.userId;
      if (userId) {
        const user = getUser(userId);
        if (user) {
          setCurrentUser(user);
          setReducedPayment(
            user.currentPayment - (user.recommendedReduction || 0)
          );
          setRecommendedReduction(user.recommendedReduction || 0);
          setFlexUsedThisYear(user.flexUsedThisYear);
          setRemainingFlexCount(3 - user.flexUsedThisYear);
        }
      }
    };

    // Listen for payment value changes
    const handlePaymentChange = (event: CustomEvent) => {
      const detail = event.detail;
      if (detail) {
        setReducedPayment(detail.reducedPayment);
        setRecommendedReduction(detail.reductionAmount);
        setPostponeMonths(detail.postponeMonths);

        // Update flex related counts
        if (detail.flexUsedThisYear !== undefined) {
          setFlexUsedThisYear(detail.flexUsedThisYear);
        }

        if (detail.MAX_FLEX_PER_YEAR !== undefined) {
          setMaxFlexPerYear(detail.MAX_FLEX_PER_YEAR);
        }

        if (detail.remainingFlexCount !== undefined) {
          setRemainingFlexCount(detail.remainingFlexCount);
        }

        if (detail.effectiveRemainingFlexCount !== undefined) {
          setEffectiveRemainingFlexCount(detail.effectiveRemainingFlexCount);
        }

        // If userId is provided, update the current user
        if (detail.userId) {
          const user = getUser(detail.userId);
          if (user) {
            setCurrentUser(user);
          }
        }
      }
    };

    // Add event listeners
    window.addEventListener("userSelectionChanged" as any, handleUserChange);
    window.addEventListener("paymentValuesChanged" as any, handlePaymentChange);

    // Cleanup
    return () => {
      window.removeEventListener(
        "userSelectionChanged" as any,
        handleUserChange
      );
      window.removeEventListener(
        "paymentValuesChanged" as any,
        handlePaymentChange
      );
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
              פתרון חכם להקטנת תשלומי המשכנתא בתקופות עמוסות פיננסית, עם פריסה
              חכמה לאורך יתרת תקופת ההלוואה
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                size="lg"
                className="bg-poalim-red hover:bg-poalim-red/90"
                onClick={() => scrollToSection("how-it-works")}
              >
                לקבל פרטים נוספים
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-poalim-red text-poalim-red hover:bg-poalim-lightRed"
                onClick={() => scrollToSection("calculator")}
              >
                קח אותי לסימולטור
              </Button>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://www.bankhapoalim.co.il/sites/default/files/media/עמוס.png"
              alt="עמוס"
              width="460"
              height="580"
              className="object-contain"
            />
          </div>

          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -z-10 w-72 h-72 bg-poalim-red/20 rounded-full -right-10 -top-10 blur-3xl"></div>
              <div className="absolute -z-10 w-72 h-72 bg-poalim-red/10 rounded-full -left-10 -bottom-10 blur-3xl"></div>
              <div className="bg-white p-6 rounded-2xl card-shadow">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-poalim-darkText">
                      תשלום משכנתא חודשי
                    </h3>
                    <p className="text-sm text-gray-500">
                      תשלום גמיש עבור {currentUser.name}
                    </p>
                  </div>
                  <div className="bg-poalim-lightRed p-2 rounded-full">
                    <Calendar className="text-poalim-red h-5 w-5" />
                  </div>
                </div>

                <div className="bg-poalim-gray rounded-xl p-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">תשלום רגיל:</span>
                    <span className="font-bold">
                      {currentUser.currentPayment} ₪
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-poalim-red font-medium">
                      תשלום מופחת Flex:
                    </span>
                    <span className="font-bold text-xl text-poalim-red">
                      {reducedPayment} ₪
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-green-500 text-sm">
                      חיסכון חודשי:
                    </span>
                    <span className="font-bold text-green-500">
                      {recommendedReduction} ₪
                    </span>
                  </div>
                  {postponeMonths > 1 && (
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-poalim-red text-sm">למשך:</span>
                      <span className="font-bold text-poalim-red">
                        {postponeMonths} חודשים
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-poalim-red text-sm">
                      גמישות שנוצלה השנה:
                    </span>
                    <span className="font-bold text-poalim-red">
                      {flexUsedThisYear}/{maxFlexPerYear}
                    </span>
                  </div>
                  {effectiveRemainingFlexCount >= 0 && (
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-poalim-red text-sm">נותרו לך:</span>
                      <span className="font-bold text-poalim-red">
                        {effectiveRemainingFlexCount} פעמים
                      </span>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    פריסת ההפרש
                  </h4>
                  <p className="text-xs text-gray-500">
                    ניתן לדחות תשלומים עד 3 פעמים בשנה ולפרוס את ההחזרים עד 24
                    חודשים
                  </p>
                </div>

                <Button
                  className="w-full bg-poalim-red hover:bg-poalim-red/90"
                  onClick={() => scrollToSection("calculator")}
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
