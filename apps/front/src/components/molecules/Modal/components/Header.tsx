import tw from 'twin.macro';

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Header = ({ children, ...props }: HeaderProps) => {
  return (
    <div css={[tw`text-lg font-bold`, tw`flex justify-between items-center`]} {...props}>
      {children}
    </div>
  );
};
