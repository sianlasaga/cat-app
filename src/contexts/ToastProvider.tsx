import { createContext, useState, useContext, useCallback } from 'react';
import { Variant } from 'react-bootstrap/esm/types';

import { DEFAULT_TOAST_DURATION, DEFAULT_TOAST_VARIANT } from '../constants';
import AppToast from '../components/AppToast';

type ToastContextData = {
  showToast: (message: string, variant?: Variant) => void;
};

type Props = {
  children: React.ReactNode;
};

const ToastContext = createContext<ToastContextData | undefined>(undefined);

const ToastProvider = ({ children }: Props) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState<Variant>(DEFAULT_TOAST_VARIANT);

  /**
   * Show a toast message
   * 
   * @param message The message to display
   * @param variant The variant of the toast message. Can be 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'. Default is 'primary'.
   */
  const showToast = useCallback((message: string, variant?: Variant) => {
    setVariant(variant || DEFAULT_TOAST_VARIANT);
    setMessage(message);
    setShow(true);
  }, []);

  const handleClose = () => setShow(false);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <AppToast
        message={message}
        show={show}
        onClose={handleClose}
        delay={DEFAULT_TOAST_DURATION}
        autohide
        bg={variant}
      />
    </ToastContext.Provider>
  );
};

// Custom hook to access the showToast function from ToastContext
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastProvider;
