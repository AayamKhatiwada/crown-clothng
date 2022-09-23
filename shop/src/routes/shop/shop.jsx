import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { setCategoriesStart } from "../../store/category/category-action";
import CategoriesPreview from "../categories-preview/categories-preview";
import Category from "../category/category";
import "./shop.scss"

const Shop = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCategoriesStart());
    }, [dispatch]);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    );
}

export default Shop;