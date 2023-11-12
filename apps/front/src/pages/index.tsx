import tw from 'twin.macro';

import { Card } from '@/components/Card';
import { MusicLayout } from '@/components/Layout/MusicLayout';

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
