import {  useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setProducts } from "../../../services/Redux/actions";
import { useEffect, useState } from "react";
import ProductBox from "../../modules/ProductBox";

export default function Example({ sortName, sortCategories, filters }) {
  const dispatch = useDispatch();
  const dataProduct = useSelector((state) => state.products);
  const [localproducts, setLocalProducts] = useState(dataProduct);
  const location = useLocation();
  const [sortCategoriesProduct, SetSortCategoriesProduct] =
    useState(dataProduct);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setLocalProducts(dataProduct);
  }, [dataProduct]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("q");
    let filteredProducts = [...dataProduct];

    if (searchQuery) {
      filteredProducts = dataProduct.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortName === "mostPopular") {
      filteredProducts = [...dataProduct].sort((a, b) => b.score - a.score);
    } else if (sortName === "lowTohigh") {
      filteredProducts = [...dataProduct].sort(
        (start, end) => start.price - end.price
      );
    } else if (sortName === "highTolow") {
      filteredProducts = [...dataProduct].sort(
        (start, end) => end.price - start.price
      );
    } else if (sortName === "newest") {
      filteredProducts = [...dataProduct].sort((a, b) => {
        const currentDate = new Date();
        const aDate = new Date(a.timestamp);
        const bDate = new Date(b.timestamp);

        const diffA = currentDate.getTime() - aDate.getTime();
        const diffB = currentDate.getTime() - bDate.getTime();

        return diffA - diffB;
      });
    }
    setLocalProducts(filteredProducts);

    if (sortCategories) {
      const categories = dataProduct.filter((product) =>
        sortCategories.includes(product.category_id)
      );
      SetSortCategoriesProduct(categories);
    }
  }, [location.search, dataProduct, sortName, sortCategories]);


  // { & filter & }
  useEffect(() => {
  const selectedFilters = filters.reduce((acc, filter) => {
    const selectedOptions = filter.options
      .filter((option) => option.checked)
      .map((option) => option.value);

    if (selectedOptions.length > 0) {
      acc[filter.id] = selectedOptions;
    }

    return acc;
  }, {});

  const filteredProducts = dataProduct.filter((product) => {
    return filters.every((filter) => {
      const productValues = filter.id === 'color'
        ? product.colors.map((color) => color.name.toLowerCase())
        : product.sizes.map((size) => size.name.toLowerCase());

      const selectedValues = selectedFilters[filter.id] || [];

      return selectedValues.length === 0 || selectedValues.every((selectedValue) =>
        productValues.includes(selectedValue)
      );
    });
  });

  setLocalProducts(filteredProducts);
}, [filters]);




  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          List Products
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <>
            {sortCategoriesProduct.length > 0
              ? sortCategoriesProduct.map((product) => (
                  <ProductBox key={product.id} {...product} />
                ))
              : localproducts.map((product) => (
                  <ProductBox key={product.id} {...product} />
                ))}
          </>
        </div>
      </div>
    </div>
  );
}
