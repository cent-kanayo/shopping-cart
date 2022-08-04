import axios from "axios";
import useSWRImmutable from "swr/immutable";

import { Drawer } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Grid } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { Wrapper, StyledButton } from "./App.styles";
import Item from "./item/Item";
import { useState } from "react";
import Cart from "./Cart/Cart";

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
  rating: { rate: number; count: number };
};
const getProducts = async (url): Promise<CartItemType[]> => {
  const { data } = await axios(url);
  return data;
};
function App() {
  const { data, error } = useSWRImmutable<CartItemType[]>(
    "https://fakestoreapi.com/products",
    getProducts,
    { revalidateIfStale: false, revalidateOnFocus: false }
  );
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState([] as CartItemType[]);
  const getTotalsItems = (items: CartItemType[]) =>
    items.reduce((acc: number, item) => acc + item.amount, 0);
  const handleAddToCart = (clickedItem: CartItemType) => {
    setProducts((prev) => {
      // if item already exist in cart ?  update it
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // else if it is not in cart, add it to cart
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };
  const handleRemoveFromCart = (id: number) => {
    setProducts((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as CartItemType[])
    );
  };
  // if (isLoading) return <CircularProgress />;
  if (error) return <div>Something went wrong...</div>;

  return (
    <Wrapper>
      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      >
        <Cart
          cartItems={products}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setIsCartOpen(true)}>
        <Badge badgeContent={getTotalsItems(products)} color="error">
          <AddShoppingCart />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
