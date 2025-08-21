import { redirect } from 'react-router-dom';

const Second = () => {
  return null;
};

export const loader = () => {
  return redirect('child');
};

export default Second;
