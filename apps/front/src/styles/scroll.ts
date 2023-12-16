import { css } from 'twin.macro';

export const scrollHidden = [
  css`
    ::-webkit-scrollbar {
      display: none;
    }

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  `,
];
