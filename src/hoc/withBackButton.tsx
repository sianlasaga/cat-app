import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const withBackButton = (Component: React.FC) => {
  const handleGoBack = () => {
    window.history.back();
  };

  const WrappedComponent: React.FC = () => (
    <>
      <Row>
        <Col>
          <Button onClick={handleGoBack}>Back</Button>
        </Col>
      </Row>
      <Component />
    </>
  );

  WrappedComponent.displayName = `withBackButton(${Component.displayName ?? Component.name})`;

  return WrappedComponent;
};

export default withBackButton;
