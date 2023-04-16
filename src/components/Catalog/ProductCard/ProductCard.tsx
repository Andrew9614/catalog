import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addProduct } from '../../../redux/shoppingCartReducer';
import { ProductType } from '../../../types/productsType';
import styles from './ProductCard.module.scss';

type ProductCardType = {
  product: ProductType;
};

export const ProductCard = ({ product }: ProductCardType) => {
  const cart = useAppSelector((state) => state.shoppingCart.products);
  const dispatch = useAppDispatch();
  const handleBuyClick = () => {
    dispatch(addProduct(product));
  };
  return (
    <div className={styles.cardContainer}>
      <div>{product.title}</div>
      <img className={styles.productImage} src={product.image} alt="product" />
      <div>
        {'Цена: '+product.regular_price.value + ' ' + product.regular_price.currency}
      </div>
      <button
        disabled={!!cart.find((el) => el.product.id === product.id)}
        onClick={handleBuyClick}
      >
        Купить
      </button>
    </div>
  );
};
