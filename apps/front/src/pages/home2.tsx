import tw from 'twin.macro';

import GradientCanvas from '@/components/LegacyGradientCanvas';

const HomePage: React.FC = () => {
  return (
    <div css={[tw`w-screen h-screen`, tw`bg-black`]}>
      {/* <Test colors={["#f00", "#a00", "#b00", "#c00", "#d00", "#e00"]} /> */}
      {/* <Test colors={["#3D30A2", "#B15EFF", "#FFA33C", "#FFFB73"]} /> */}
      <GradientCanvas
        colors={[
          { r: 61, g: 48, b: 162 },
          { r: 177, g: 94, b: 255 },
          { r: 255, g: 163, b: 60 },
          { r: 255, g: 251, b: 115 },
        ]}
        fps={60}
        speed={0.5}
        particleNumber={20}
      >
        123123
      </GradientCanvas>
    </div>
  );
};

export default HomePage;
