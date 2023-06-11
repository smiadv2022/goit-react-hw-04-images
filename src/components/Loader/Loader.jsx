import { ColorRing } from 'react-loader-spinner';
import { Overlay } from './Loader.styled';

export const Loader = () => {
  return (
    <Overlay>
      <ColorRing />
    </Overlay>
  );
};
