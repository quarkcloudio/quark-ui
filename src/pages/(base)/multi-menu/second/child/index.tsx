import { redirect } from 'react-router-dom';

const Child = () => {
  return null;
};

export const loader = () => {
  return redirect('home');
};

export default Child;
