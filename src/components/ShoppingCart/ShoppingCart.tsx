import { Modal } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  deleteProduct,
  sendOrders,
  setCount,
} from '../../redux/shoppingCartReducer';
import { ProductType } from '../../types/productsType';
import styles from './ShoppingCart.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormValues } from './Form/Form';

export const ShoppingCart = () => {
  const cart = useAppSelector((state) => state.shoppingCart);
  const dispatch = useAppDispatch();

  const [modalText, setModalText] = useState<string | null>(null);
  const [isModalForm, setIsModalForm] = useState(false);
  const calculateSum = () => {
    let sum = 0;
    for (let el of cart.products) {
      sum += el.count * el.product.regular_price.value;
    }
    return Math.round(sum * 100) / 100;
  };

  const handleCountChange = (id: number, count: number) => {
    dispatch(setCount({ id: id, count: count }));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProduct({ id: id }));
  };
  const handleMakeOrder = () => {
    setIsModalForm(true);
  };
  const handleOrderSubmit = async (values: FormValues) => {
    const res = await dispatch(sendOrders());
    if (res.payload.result === 'ok') {
      setModalText('Заказ успешно создан');
      return true;
    } else {
      setModalText('Ошибка, попробуйте еще раз');
      return false;
    }
  };

  const handleClose = () => {
    setIsModalForm(false);
  };
  return (
    <>
      <Modal open={!!isModalForm} onClose={handleClose}>
        <div className={styles.modalWrapper}>
          <div className={styles.modalContainer}>
            {modalText ? (
              <>
                <div className={styles.message}>{modalText}</div>
                <Link to={'/'}>
                  <button onClick={handleClose}>Вернуться на главную</button>
                </Link>
              </>
            ) : (
              <Form handleSubmit={handleOrderSubmit} />
            )}
          </div>
        </div>
      </Modal>
      <div className={styles.shoppingCartContainer}>
        {cart.products.length ? (
          <>
            <div className={styles.orderContainer}>
              {cart.products.map((el) => (
                <Order
                  key={el.product.id}
                  handleCountChange={handleCountChange}
                  handleDelete={handleDelete}
                  order={el}
                />
              ))}
            </div>
            <div className={styles.footer}>
              <div className={styles.sum}>
                {'Общая сумма: ' +
                  calculateSum() +
                  ' ' +
                  cart.products[0].product.regular_price.currency}
              </div>
              <button disabled={cart.isOrdersSending} onClick={handleMakeOrder}>
                Заказать
              </button>
            </div>
          </>
        ) : (
          <h4>Корзина пуста</h4>
        )}
      </div>
    </>
  );
};

type OrderType = {
  order: {
    product: ProductType;
    count: number;
  };
  handleCountChange: (id: number, count: number) => void;
  handleDelete: (id: number) => void;
};

const Order = ({ order, handleCountChange, handleDelete }: OrderType) => {
  return (
    <div className={styles.order}>
      <img src={order.product.image} alt="order" />
      <div className={styles.details}>
        <div>{order.product.title}</div>

        <div className={styles.count}>
          <button
            disabled={order.count <= 1}
            onClick={() => handleCountChange(order.product.id, -1)}
          >
            -
          </button>
          {order.count}
          <button onClick={() => handleCountChange(order.product.id, 1)}>
            +
          </button>
        </div>
        <div className={styles.price}>
          {'Цена: ' +
            Math.round(order.product.regular_price.value * order.count * 100) /
              100 +
            ' ' +
            order.product.regular_price.currency}
        </div>
      </div>
      <button
        onClick={() => handleDelete(order.product.id)}
        className={styles.delete}
      >
        Delete
      </button>
    </div>
  );
};
