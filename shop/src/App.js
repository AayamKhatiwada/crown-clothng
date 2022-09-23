import Home from "./routes/home/home";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./routes/navigation/navigation";
import Authentication from "./routes/authentication/authentication";
import Shop from "./routes/shop/shop";
import Checkout from "./routes/checkout/checkout";
import { useEffect } from "react";
import { changeUser, checkUserSession } from "./store/user/user-action"

import { createUserDocumentFromAuth, getCurrentUser, onAuthStateChangedListener } from "./routes/utils/firebase";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession())
    // const unsubscribe = onAuthStateChangedListener((user) => {
    //   if (user) {
    //     createUserDocumentFromAuth(user);
    //   }
    //   // console.log(changeUser(user));
    //   dispatch(changeUser(user));
    // })
    // return unsubscribe;
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<NavigationBar />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={
            <Shop />
          } />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>

    </>
  );
}

export default App;
