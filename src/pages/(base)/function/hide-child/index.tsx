import { replace } from 'react-router-dom';

const HideChild = () => {
  return null;
};

export const loader = () => {
  return replace('one');
};

export default HideChild;
