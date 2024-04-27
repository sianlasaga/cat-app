import Toast, { ToastProps } from 'react-bootstrap/Toast';
import styled from 'styled-components';

interface AppToastProps extends ToastProps {
  message: string;
}

const AppToast: React.FC<AppToastProps> = ({ message, ...rest }) => {
  return (
    <Toast {...rest}>
      <Toast.Header>
        <strong className="me-auto text-start">{message}</strong>
      </Toast.Header>
    </Toast>
  );
};

export default styled(AppToast)`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;
