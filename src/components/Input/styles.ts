import styled from 'styled-components';

interface Props {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<Props>`
  display: flex;
  align-items: center;

  background: #fff;
  color: #ff9000;
  border-radius: 8px;
  padding: 18px 24px;
  width: 100%;
  font-size: 16px;

  border-color: ${props => props.isFocused ? '#ff9000' : ''}
  
  & + div {
    margin-top: 24px;
  }

  h1 {
    margin-bottom: 40px;
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #b7b7cc;

    &::placeholder {
      color: #b7b7cc;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
