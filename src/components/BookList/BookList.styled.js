import styled from 'styled-components';

export const StyledBook = styled.div`
  width: calc((100% - 75px) / 4);
  padding: 15px;
  border: 1px solid black;
  border-radius: 10px;
  position: relative;

  .book-icon.favourite {
    fill: red;
  }

  .book-icon {
    position: absolute;
    left: 10px;
    top: 10px;
  }

  & .btn-delete {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;

export const StyledBookList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
`;
