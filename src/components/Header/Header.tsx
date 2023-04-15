import styles from './Header.module.scss';
import { useAppSelector } from '../../redux/hooks';
import { Link } from 'react-router-dom';

export const Header = () => {
  const cart = useAppSelector((state) => state.shoppingCart.products);
  const handleClick = () => {};
  return (
    <div className={styles.headerContainer}>
      <Link to={'/shopping-cart'} onClick={handleClick} className={styles.shoppingCart}>
        <img src="/images/shopping-cart-white.png" alt="cart" />
        {!!cart.length && <div className={styles.count}>{cart.length}</div>}
      </Link>
    </div>
  );
};
