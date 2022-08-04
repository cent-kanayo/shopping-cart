import styled from "styled-components";
import { CartItemType } from "../App";
import { Button } from "@mui/material";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <Wrapper>
    <img src={item.image} alt={item.title} />
    <div>
      <header>
        <h3>{item.category}</h3>
        <p>${item.price}</p>
      </header>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <footer>
        <p>{item.rating.rate}</p>
        <p>{item.rating.count}</p>
      </footer>
    </div>
    <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
  </Wrapper>
);

const Wrapper = styled.div``;
export default Item;
