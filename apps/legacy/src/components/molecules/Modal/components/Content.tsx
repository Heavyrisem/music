import tw from 'twin.macro';

export interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Content = ({ children, ...props }: ContentProps) => {
  return (
    <div css={[tw`flex flex-col gap-4`, tw`lg:(min-w-[20rem])`]} {...props}>
      {children}
    </div>
  );
};
