import styled from "styled-components";

interface Props {
  message?: string | null;
}

const ErrorMessage: React.FC<Props> = ({ message }) => {
  return message ? <ErrorContainer>{message}</ErrorContainer> : null;
};

const ErrorContainer = styled.div`
  color: red;
  padding: 0.5rem 1rem;
  margin: 1rem 0;
`;

export default ErrorMessage;
