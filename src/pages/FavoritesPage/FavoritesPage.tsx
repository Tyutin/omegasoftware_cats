import ProductList from '../../components/ProductList/ProductList';
import { useBoundStore } from '../../store/useBoundStore';

export default function FavoritesPage() {
  const favoriteProducts = useBoundStore((state) => state.favoriteProducts);
  return (
    <div className="page">
      {favoriteProducts.length ? (
        <ProductList products={favoriteProducts} />
      ) : (
        <span>Список избранного пуст</span>
      )}
    </div>
  );
}
