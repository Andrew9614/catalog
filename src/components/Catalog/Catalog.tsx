import { getProducts } from '../../redux/catalogReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect } from 'react';
import { Card } from '../Card/Card';

export const Catalog = () => {
  const state = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <div>
      {state.isCatalogLoading ? (
        <div>loading</div>
      ) : (
        state.products.map((el) => <Card product={el} key={el.id} />)
      )}
    </div>
  );
};
