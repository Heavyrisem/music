import tw from 'twin.macro';

export interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Footer = ({ children, ...props }: FooterProps) => {
  return (
    <div css={[tw`flex justify-end gap-2`]} {...props}>
      {children}
    </div>
  );
};
