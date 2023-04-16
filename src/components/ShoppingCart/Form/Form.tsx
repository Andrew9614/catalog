import { CircularProgress, TextField } from '@mui/material';
import { useFormik } from 'formik';
import styles from './Form.module.scss';
import { useAppSelector } from '../../../redux/hooks';

type errors = {
  name?: string;
  phone?: string;
};

export type FormValues = { name: string; phone: string };

type FormType = {
  handleSubmit: (values: FormValues) => Promise<boolean>;
};
export const Form = ({ handleSubmit }: FormType) => {
	const isSubmitting = useAppSelector((state)=> state.shoppingCart.isOrdersSending)
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
    },
    validate: (values) => {
      const errors: errors = {};
      if (!values.name) {
        errors.name = 'Введите имя';
      }
      if (!values.phone) {
        errors.phone = 'Введите номер телефон';
      } else if (!/^\+[1-9][0-9]+$/.test(values.phone)) {
        errors.phone = 'Неверный номер телефона';
      }
      return errors;
    },
    onSubmit: (values) => {
      handleSubmit(values).then((res) => {
      });
    },
  });
  return (
    <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
      <TextField
        name={'name'}
        variant="outlined"
        label={'Имя'}
        error={Boolean(formik.errors.name) && formik.touched.name}
        helperText={formik.touched.name ? formik.errors.name : ''}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      ></TextField>
      <TextField
        name={'phone'}
        variant="outlined"
        label={'Телефон'}
        error={Boolean(formik.errors.phone) && formik.touched.phone}
        helperText={formik.touched.phone ? formik.errors.phone : ''}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      ></TextField>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <CircularProgress color="inherit" /> : 'Заказать'}
      </button>
    </form>
  );
};
