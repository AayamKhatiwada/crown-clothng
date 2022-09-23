import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview";
import Spinner from "../../components/spinner/spinner";
import { selectCategoriesIsLoading, selectCategoriesMap } from "../../store/category/category-selector";

const CategoriesPreview = () => {

    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    return (
        <>
            {isLoading ? (<Spinner />) :
                (Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return (
                        <CategoryPreview key={title} title={title} products={products} />
                    );
                }))
            }
        </>
    );
}

export default CategoriesPreview;