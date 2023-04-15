import {
  applyFilter,
  getCatalog,
  setActivePage,
} from '../../redux/catalogReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect } from 'react';
import { ProductCard } from './ProductCard/ProductCard';
import styles from './Catalog.module.scss';
import { Pagination } from '@mui/material';
import { Filter } from './Filter/Filter';

export const Catalog = () => {
  const catalog = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setActivePage(value));
    dispatch(applyFilter());
  };

  useEffect(() => {
    dispatch(getCatalog()).then(() => dispatch(applyFilter()));
  }, [dispatch]);

  return (
    <div className={styles.catalogWrapper}>
      {catalog.isCatalogLoading ? (
        <div>loading</div>
      ) : (
        <div className={styles.catalogContainer}>
          <Filter brands={catalog.brands} />
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
