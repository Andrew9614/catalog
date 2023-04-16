import styles from './Filter.module.scss';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  applyFilters,
  clearFilter,
  setActiveFilter,
  setSortByPriceType,
} from '../../../redux/catalogReducer';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';

export const Filter = () => {
  const catalog = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    dispatch(setActiveFilter({ checked: e.target.checked, id: id }));
    dispatch(applyFilters());
  };
  const handleSortChange = (
    e: SelectChangeEvent<'ascending' | 'descending' | 'default'>
  ) => {
    dispatch(
      setSortByPriceType({
        type: e.target.value as 'ascending' | 'descending' | 'default',
      })
    );
    dispatch(applyFilters());
  };
  return (
    <Accordion className={styles.filterWrapper}>
      <AccordionSummary
        expandIcon={
          <div style={{ transform: 'rotate(-90deg)' }}>
            <b>{'<'}</b>
          </div>
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Фильтры</Typography>
      </AccordionSummary>
      <AccordionDetails className={styles.filterContainer}>
        <div className={styles.brandFilter}>
          <span>
            <b>Бренды</b>
          </span>
          {catalog.brands.map((brand) => (
            <div key={brand.id}>
              <input
                type="checkbox"
                checked={!!brand.active}
                onChange={(e) => handleChange(e, brand.id)}
              />
              <label>{brand.title}</label>
            </div>
          ))}
        </div>
        <FormControl>
          <InputLabel id="label">{'Сорировать цену:'}</InputLabel>
          <Select
            labelId="label"
            label="Сорировать цену:"
            value={catalog.sortByPrice}
            onChange={handleSortChange}
          >
            <MenuItem value="default">По умолчанию</MenuItem>
            <MenuItem value="ascending">По возрастанию</MenuItem>
            <MenuItem value="descending">По убыванию</MenuItem>
          </Select>
        </FormControl>
        <button onClick={() => dispatch(clearFilter())}>Сбросить фильтр</button>
      </AccordionDetails>
    </Accordion>
  );
};
