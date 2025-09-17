import { useState, useCallback } from 'react';

interface TourStep {
  title: string;
  description: string;
  target?: string;
}

const tourSteps: TourStep[] = [
  {
    title: 'Welcome to Trading Hub!',
    description: 'Let\'s take a quick tour to help you get familiar with all the powerful features available in your trading dashboard.',
    target: 'dashboard'
  },
  {
    title: 'Account Management',
    description: 'Here you can manage all your trading accounts. Add new MT5 accounts, monitor their status, and configure account settings.',
    target: 'accounts'
  },
  {
    title: 'Copy Trading',
    description: 'Set up copy trading groups to automatically replicate trades from master accounts to child accounts with customizable risk management.',
    target: 'copy-trading'
  },
  {
    title: 'TradingView Integration',
    description: 'Connect your TradingView strategies directly to your trading accounts using our webhook connectors for automated trading.',
    target: 'trading-view'
  },
  {
    title: 'Order History',
    description: 'Track all your trading activity with detailed order history, including group orders and individual account transactions.',
    target: 'order-history'
  },
  {
    title: 'Wallet Management',
    description: 'Manage your account balance, add funds, and track all financial transactions in one convenient location.',
    target: 'wallet'
  },
  {
    title: 'Referral Program',
    description: 'Earn rewards by referring new users. Track your referral earnings and manage your referral network.',
    target: 'referral'
  },
  {
    title: 'Activity Logs',
    description: 'Monitor all account activities and system events to keep track of everything happening in your trading environment.',
    target: 'activity-logs'
  },
  {
    title: 'Profile Settings',
    description: 'Update your personal information, preferences, and account settings to customize your trading experience.',
    target: 'profile'
  },
  {
    title: 'You\'re All Set!',
    description: 'Congratulations! You\'ve completed the tour. You\'re now ready to start trading with Trading Hub. Happy trading!',
    target: 'dashboard'
  }
];

export const useTour = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const startTour = useCallback(() => {
    setIsActive(true);
    setCurrentStep(1);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < tourSteps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsActive(false);
      setCurrentStep(1);
    }
  }, [currentStep]);

  const previousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const skipTour = useCallback(() => {
    setIsActive(false);
    setCurrentStep(1);
  }, []);

  const closeTour = useCallback(() => {
    setIsActive(false);
    setCurrentStep(1);
  }, []);

  const getCurrentStep = useCallback(() => {
    return tourSteps[currentStep - 1];
  }, [currentStep]);

  return {
    isActive,
    currentStep,
    totalSteps: tourSteps.length,
    currentStepData: getCurrentStep(),
    startTour,
    nextStep,
    previousStep,
    skipTour,
    closeTour
  };
};