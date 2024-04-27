import React from 'react';
import { Link } from 'react-router-dom';
import Card, { CardProps } from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Cat } from '../../types/CatTypes';
import styled from 'styled-components';

interface CatCardProps extends CardProps {
  cat: Cat;
}

const StyledCard = styled(Card)`
  padding: 0;
`;

const CatPreviewCard: React.FC<CatCardProps> = ({ cat, ...rest }) => {
  return (
    <StyledCard {...rest}>
      <Card.Img variant="top" src={cat.url} />
      <Card.Body className="p-3">
        <Link to={`/cat/${cat.id}`}>
          <Button className="w-100" variant="primary">
            View details
          </Button>
        </Link>
      </Card.Body>
    </StyledCard>
  );
};

export default CatPreviewCard;
