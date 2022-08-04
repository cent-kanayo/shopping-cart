import useSWR from "swr";
import axios from "axios";

import { Drawer } from "@mui/material";
import { CircularProgress } from "@mui/material";
import Grid from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import Badge from "@mui/material";
import { Wrapper } from "./App.styles";

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
  rating: object;
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
  console.log(data);
  // if (isLoading) return <CircularProgress />;
  // if (error) return <div>Something went wrong...</div>;

  return <h2>Hello World</h2>;
}

export default App;
