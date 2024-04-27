import React from 'react';
import Card, { CardProps } from 'react-bootstrap/Card';

import { Cat } from '../../types/CatTypes';

interface CatCardProps extends CardProps {
  cat: Cat;
}

const CatDetailsCard: React.FC<CatCardProps> = ({ cat, ...rest }) => {
  return (
    <Card {...rest}>
      <Card.Img variant="top" src={cat.url} />
      <Card.Body>
        <Card.Title>{cat.breeds[0].name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Origin: {cat.breeds[0].origin}
        </Card.Subtitle>
        <Card.Text>{cat.breeds[0].temperament}</Card.Text>
        <Card.Text>{cat.breeds[0].description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CatDetailsCard;
