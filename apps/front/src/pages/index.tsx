import tw from 'twin.macro';

import Test from '@/components/Test/Test';

const Home = () => {
  return (
    <div css={[tw`w-screen h-screen`, tw`bg-black`]}>
      <Test colors={['#3D30A2', '#B15EFF', '#FFA33C', '#FFFB73']} />
    </div>
  );
};

export default Home;
