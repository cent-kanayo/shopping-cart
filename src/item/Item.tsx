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
        <p>Rating: {item.rating.rate}</p>
        <p>Count: {item.rating.count}</p>
      </footer>
    </div>
    <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  border: 1px solid lightblue;
  border-radius: 20px;
  height: 100%;
  button {
    border-radius: 0 0 20px 20px;
  }
  img {
    max-height: 250px;
    object-fit: cover;
    border-radius: 20px 20px 0 0;
  }
  div {
    font-family: Arial, Helvetica, sans-serif;
    padding: 1rem;
    height: 100%;
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;
export default Item;
