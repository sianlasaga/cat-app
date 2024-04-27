import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const withBackButton = (Component: React.FC) => {
  const handleGoBack = () => {
    window.history.back();
  };

  return () => (
    <>
      <Row>
        <Col>
          <Button onClick={handleGoBack}>Back</Button>
        </Col>
      </Row>
      <Component />
    </>
  );
};

export default withBackButton;
