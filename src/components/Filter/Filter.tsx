import styles from './Filter.module.scss';
import { BrandsType } from '../../types/brandsType';
import { useAppDispatch } from '../../redux/hooks';
import {
  applyFilter,
  clearFilter,
  setActiveFilter,
} from '../../redux/catalogReducer';

type FilterType = {
  brands: BrandsType[];
};

export const Filter = ({ brands }: FilterType) => {
  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    dispatch(setActiveFilter({ checked: e.target.checked, id: id }));
    dispatch(applyFilter());
  };
  return (
    <div className={styles.filterContainer}>
      {brands.map((brand) => (
        <div key={brand.id}>
          <input
            type="checkbox"
						checked={!!brand.active}
            onChange={(e) => handleChange(e, brand.id)}
          />
          <label>{brand.title}</label>
        </div>
      ))}
      <button onClick={() => dispatch(clearFilter())}>clear</button>
    </div>
  );
};
