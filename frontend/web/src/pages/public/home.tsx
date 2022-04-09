import { Link } from '@mui/material';

export const HomePage: React.FC = () => {
  return (
    <div>
      This is the home page. <Link href='/admin'>Go to admin</Link>
    </div>
  );
};
