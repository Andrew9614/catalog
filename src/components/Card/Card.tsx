import { ProductType } from '../../types/productsType';

type CardType = {
  product: ProductType;
};

export const Card = ({ product }: CardType) => {
  return (
    <div>
      <div>{product.title}</div>
      <img src={product.image} alt="product" />
      <div>{product.brand}</div>
      <div>{product.sku}</div>
      <div>{product.type}</div>
      <div>
        {product.regular_price.value + ' ' + product.regular_price.currency}
      </div>
    </div>
  );
};
