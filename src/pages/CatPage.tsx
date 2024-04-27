import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import { fetchCat } from '../api/cat';
import { useToast } from '../contexts/ToastContext';
import { DEFAULT_API_ERROR_MESSAGE } from '../constants';
import { Cat } from '../types/CatTypes';
import CatDetailsCard from '../components/AppCard/CatDetailsCard';
import withBackButton from '../hoc/withBackButton';

const CatPage = () => {
  const { id } = useParams();
  const { showToast } = useToast();
  const [cat, setCat] = useState<Cat | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getCat = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const response = await fetchCat(id);
      setCat(response);
    } catch (error) {
      showToast(DEFAULT_API_ERROR_MESSAGE, 'danger');
    } finally {
      setIsLoading(false);
    }
  }, [id, showToast]);

  // Fetch cat data on page load
  useEffect(() => {
    getCat();
  }, [getCat]);

  const renderCat = () => {
    if (isLoading) {
      return <Spinner />;
    } else if (!cat) {
      return (
        <Row>
          <Col>
            <h2>{`Sorry, we couldn't find this cat. Miau?`}</h2>
          </Col>
        </Row>
      );
    }

    return <CatDetailsCard cat={cat} />;
  };

  return (
    <Container className="py-4 justify-content-center d-flex">
      {renderCat()}
    </Container>
  );
};

export default withBackButton(CatPage);
