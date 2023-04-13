import { getProducts, setActivePage } from '../../redux/catalogReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect } from 'react';
import { Card } from '../Card/Card';
import { Pagination } from '@mui/material';

export const Catalog = () => {
  const state = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProducts()).then(() => dispatch(setActivePage(1)));
  }, [dispatch]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setActivePage(value));
  };

  return (
    <div>
      {state.isCatalogLoading ? (
        <div>loading</div>
      ) : (
        state.products.map((el) => <Card product={el} key={el.id} />)
      )}
      <Pagination count={state.pageCount} onChange={handlePageChange} />
    </div>
  );
};
