import { ChangeEvent, useCallback, useMemo } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CatProvider, { useCatContext } from '../contexts/CatContext';
import AppSelect from '../components/AppSelect';
import { CatBreed } from '../types/CatTypes';
import CatCardList from '../components/AppCard/CatCardList';
import withProviders from '../hoc/withProviders';

const HomePage = () => {
  const {
    breeds,
    selectBreedId,
    selectedBreedId,
    catResult,
    hasReachedEnd,
    loadMore,
  } = useCatContext();
  const breedOptions = useMemo(
    () => breeds.map((breed) => ({ value: breed.id, label: breed.name })),
    [breeds]
  );

  const handleSelectBreed = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      selectBreedId(event.target.value as CatBreed['id']);
    },
    [selectBreedId]
  );

  return (
    <Container>
      <h1>Cat Browser</h1>
      <Row className="py-4">
        <Col lg={3} md={6} xs={12}>
          <AppSelect
            options={breedOptions}
            onChange={handleSelectBreed}
            placeholder="Select breed"
            value={selectedBreedId}
          />
        </Col>
      </Row>
      <Row>
        <CatCardList
          cats={catResult}
          hasMore={!hasReachedEnd}
          onLoadMore={loadMore}
        />
      </Row>
    </Container>
  );
};

export default withProviders(CatProvider)(HomePage);
