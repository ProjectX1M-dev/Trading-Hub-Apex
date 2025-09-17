import React from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';

interface TourStep {
  title: string;
  description: string;
  target?: string;
}

interface TourModalProps {
  isOpen: boolean;
  currentStep: number;
  totalSteps: number;
  step: TourStep;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  onClose: () => void;
}

const TourModal: React.FC<TourModalProps> = ({
  isOpen,
  currentStep,
  totalSteps,
  step,
  onNext,
  onPrevious,
  onSkip,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">{currentStep}</span>
            </div>
            <span className="text-gray-400 text-sm">
              {currentStep} of {totalSteps}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          <h3 className="text-white text-lg font-semibold mb-2">{step.title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {currentStep > 1 && (
              <button
                onClick={onPrevious}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onSkip}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Skip
            </button>
            <button
              onClick={onNext}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <span>{currentStep === totalSteps ? 'Finish' : 'Next'}</span>
              {currentStep < totalSteps && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourModal;