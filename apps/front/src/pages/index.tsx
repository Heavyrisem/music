import tw from 'twin.macro';

import { Card } from '@/components/Card';
import { DynamicGradient } from '@/components/DynamicGradient';
import { DefaultLayout } from '@/components/Layout/DefaultLayout';

const HomePage: React.FC = () => {
  return (
    <DefaultLayout>
      <DynamicGradient
        colors={['#313866', '#504099', '#974EC3', '#FE7BE5']}
        css={[tw`flex items-center justify-center`]}
      >
        <Card>
          <div css={[tw`font-bold text-xl`]}>Home</div>
        </Card>
      </DynamicGradient>
    </DefaultLayout>
  );
};

export default HomePage;
