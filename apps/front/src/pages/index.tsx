import tw from 'twin.macro';

import { MusicLayout } from '@/components/Layout/MusicLayout';
import { Card } from '@/components/atoms/Card';

const HomePage: React.FC = () => {
  return (
    <MusicLayout css={[tw``]}>
      Home
      <div>
        <Card>123</Card>
      </div>
    </MusicLayout>
  );
};

export default HomePage;
