import { ProductType } from '../../types/productsType';
import styles from './Card.module.scss'

type CardType = {
  product: ProductType;
};

export const Card = ({ product }: CardType) => {
  return (
    <div className={styles.cardContainer}>
      <div>{product.title}</div>
      <img className={styles.productImage} src={product.image} alt="product" />
      <div>{product.brand}</div>
      <div>{product.sku}</div>
      <div>{product.type}</div>
      <div>
        {product.regular_price.value + ' ' + product.regular_price.currency}
      </div>
    </div>
  );
};
