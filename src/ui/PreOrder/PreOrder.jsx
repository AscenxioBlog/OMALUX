import React from 'react';
import { useSearchParams } from 'react-router-dom';
import PreOrderHero from './PreOrderHero';
import BatchOptions from './BatchOptions';
import PreOrderForm from './PreOrderForm';
import PreOrderFAQ from './PreOrderFAQ';
import { shopProductsS } from '../../../Resources/ShopProducts';

function PreOrder() {
  const [searchParams] = useSearchParams();
  const selectedProductIds = (searchParams.get('productIds') || '')
    .split(',')
    .map((id) => Number(id))
    .filter((id) => Number.isInteger(id) && id > 0);
  const selectedProducts = shopProductsS.filter((product) => selectedProductIds.includes(product.id));
  const source = searchParams.get('source') || 'pre-order-page';

  return (
    <div className="px-4 lg:px-18 py-8 space-y-8">
      <PreOrderHero />
      <BatchOptions />
      <PreOrderForm selectedProducts={selectedProducts} source={source} />
      <PreOrderFAQ />
    </div>
  );
}

export default PreOrder;
