import {
  applyFilters,
  getCatalog,
  setActivePage,
} from '../../redux/catalogReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect } from 'react';
import { ProductCard } from './ProductCard/ProductCard';
import styles from './Catalog.module.scss';
import { CircularProgress, Pagination } from '@mui/material';
import { Filter } from './Filter/Filter';

export const Catalog = () => {
  const catalog = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setActivePage(value));
    dispatch(applyFilters());
  };

  useEffect(() => {
    dispatch(getCatalog()).then(() => dispatch(applyFilters()));
  }, [dispatch]);

  return (
    <div className={styles.catalogWrapper}>
      {catalog.isCatalogLoading ? (
        <div className={styles.loader}><CircularProgress /></div>
      ) : (
        <div className={styles.catalogContainer}>
          <Filter />
          <div className={styles.products}>
            {catalog.products.map((el) => (
              <ProductCard product={el} key={el.id} />
            ))}
          </div>
        </div>
      )}
      {!catalog.isCatalogLoading && (
        <Pagination
          page={catalog.activePage}
          className={styles.pagination}
          count={catalog.pageCount}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
};
