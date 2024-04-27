import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Cat } from '../../types/CatTypes';
import CatPreviewCard from './CatPreviewCard';

interface CatCardListProps {
  cats: Cat[];
  hasMore: boolean;
  onLoadMore: () => void;
}

const CatCardList: React.FC<CatCardListProps> = ({
  cats,
  hasMore,
  onLoadMore,
}) => {
  const renderLoadMoreButton = () => {
    if (!hasMore || cats.length == 0) return null;
    return (
      <Row>
        <Col>
          <Button variant="success" onClick={onLoadMore}>
            Load more
          </Button>
        </Col>
      </Row>
    );
  };

  const renderCatList = () => {
    if (!cats.length)
      return (
        <Col>
          <p>No cats available</p>
        </Col>
      );
    return cats.map((cat) => (
      <Col className="gap-2 mb-4" key={cat.id} xs={12} sm={6} md={3}>
        <CatPreviewCard cat={cat} />
      </Col>
    ));
  };

  return (
    <>
      <Row>{renderCatList()}</Row>
      {renderLoadMoreButton()}
    </>
  );
};

export default CatCardList;
