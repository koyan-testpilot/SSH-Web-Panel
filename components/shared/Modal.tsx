
import React from 'react';
import Icon from './Icon';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div 
        className="bg-secondary rounded-lg shadow-2xl w-full max-w-lg mx-auto transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-tertiary">
          <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
            <Icon name="close" className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
