import tw from 'twin.macro';

export interface BodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Body = ({ children, ...props }: BodyProps) => {
  return (
    <div css={[tw`flex gap-4`]} {...props}>
      {children}
    </div>
  );
};
