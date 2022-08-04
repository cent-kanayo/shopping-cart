import useSWR from "swr";
import axios from "axios";

import { Drawer } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Grid } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import Badge from "@mui/material";
import { Wrapper } from "./App.styles";
import Item from "./item/Item";

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
  const { data, error } = useSWR<CartItemType[]>(
    "https://fakestoreapi.com/products",
    getProducts
  );
  const getTotalsItems = () => null;
  const handleAddToCart = (clickedItem: CartItemType) => null;
  const handleRemoveFromCart = () => null;
  // if (isLoading) return <CircularProgress />;
  if (error) return <div>Something went wrong...</div>;

  return (
    <Wrapper>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
