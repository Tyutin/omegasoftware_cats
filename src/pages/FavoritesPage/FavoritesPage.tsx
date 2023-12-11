import ProductList from '../../components/ProductList/ProductList';
import { useFavoriteStore } from '../../store/favorite/favorite';

export default function FavoritesPage() {
  const favoriteProducts = useFavoriteStore((state) => state.products);
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
