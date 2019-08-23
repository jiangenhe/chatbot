import styled from 'styled-components';
import { scale } from '../../common/animations';

const Image = styled.img`
  animation: ${scale} 0.3s ease forwards;
  border-radius: ${props => (props.user ? '50% 50% 50% 0' : '50% 50% 0 50%')};
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 2px 0px;
  height: ${props => (props.user ? '35px' : '55px')};
  min-width: ${props => (props.user ? '35px' : '55px')};
  padding: 3px;
  transform: scale(0);
  transform-origin: ${props => (props.user ? 'bottom left' : 'bottom right')};
  width: ${props => (props.user ? '35' : '55')};
`;

export default Image;
