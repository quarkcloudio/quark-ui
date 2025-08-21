import { redirect } from 'react-router-dom';

const Page = () => {
  return null;
};

export const loader = () => {
  return redirect('child');
};

export default Page;
