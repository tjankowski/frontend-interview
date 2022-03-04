import styled from "styled-components";
import { Item } from "../hooks/useHistory";

interface Props {
  history: Item[];
}

const History: React.FC<Props> = ({ history }) => {
  if (history.length < 1) {
    return null;
  }
  return (
    <Container>
      <Header>History</Header>
      <List>
        {history.map(({ amount, from, to, result, timestamp }, index) => (
          <ListItem key={index}>
            {amount} {from} was {result} {to} on the{" "}
            {new Date(timestamp).toLocaleDateString()}{" "}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

const Header = styled.h1`
  font-size: 1rem;
  font-weight: bold;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  color: gray;
`;

const Container = styled.div`
  margin: 2rem 0;
`;

export default History;
