import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { baseToken, colorToken } from '@/theme/theme.css';

export const checkboxVariants = recipe({
  base: {
    display: 'inline-flex',
    boxSizing: 'border-box',
    padding: baseToken.spacing['0.5'],
    appearance: 'none',
    width: baseToken.width.fit,
    height: baseToken.height.fit,
    backgroundColor: 'transparent',
    border: `2px solid ${colorToken['background.primary']}`,
    borderRadius: baseToken.radius.md,
    cursor: 'pointer',
    ...baseToken.transition.colors,
  },
  variants: {
    checked: {
      false: {
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: colorToken['background.netural'],
          },
        },
      },
      true: {
        backgroundColor: colorToken['background.primary'],
      },
    },
    disabled: {
      false: {},
      true: {
        opacity: 0.3,
        cursor: 'not-allowed',
      },
    },
  },
});

export const checkboxIconStyle = style({
  fill: colorToken.text,
  width: baseToken.width['4'],
  height: baseToken.height['4'],
  visibility: 'hidden',
  selectors: {
    [`.${checkboxVariants.classNames.variants.checked.true} &`]: {
      fill: colorToken['text.inverse'],
      visibility: 'visible',
    },
  },
});
