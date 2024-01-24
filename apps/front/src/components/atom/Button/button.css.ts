import { assignVars, createThemeContract } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { baseToken, colorToken } from '@/theme/theme.css';
import { transition } from '@/theme/token/transition';

const buttonVars = createThemeContract({
  backgroundColor: null,
  borderColor: null,
  color: null,
});

export const buttonVariants = recipe({
  base: {
    paddingInline: baseToken.spacing['2'],
    paddingBlock: baseToken.spacing['1'],
    backgroundColor: buttonVars.backgroundColor,
    borderColor: buttonVars.borderColor,
    borderStyle: 'solid',
    borderWidth: baseToken.spacing['0.5'],
    color: buttonVars.color,
    borderRadius: baseToken.radius.md,
    boxSizing: 'border-box',
    fontWeight: baseToken.fontWeight.medium,
    cursor: 'pointer',
    ...baseToken.transition.colors,
    ...baseToken.fontSize['14'],
  },
  variants: {
    variant: {
      outlined: {
        vars: assignVars(buttonVars, {
          backgroundColor: 'transparent',
          borderColor: colorToken['background.primary'],
          color: colorToken['text.button.outlined'],
        }),
        selectors: {
          '&:hover:not(:disabled)': {
            vars: assignVars(buttonVars, {
              backgroundColor: colorToken['background.primary.hover'],
              borderColor: colorToken['background.primary.hover'],
              color: colorToken['text.button.contained'],
            }),
          },
        },
      },
      contained: {
        vars: assignVars(buttonVars, {
          backgroundColor: colorToken['background.primary'],
          borderColor: colorToken['background.primary'],
          color: colorToken['text.button.contained'],
        }),
        selectors: {
          '&:hover:not(:disabled)': {
            vars: assignVars(buttonVars, {
              backgroundColor: colorToken['background.primary.hover'],
              borderColor: colorToken['background.primary.hover'],
              color: colorToken['text.button.contained'],
            }),
          },
        },
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
  defaultVariants: {
    variant: 'contained',
    disabled: false,
  },
});
