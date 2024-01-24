import { assignVars, createThemeContract, createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { baseToken, colorToken } from '@/theme/theme.css';

const switchVars = createThemeContract({
  icon: {
    width: null,
    height: null,
    transform: null,
  },
  container: {
    width: null,
    height: null,
  },
});

export const switchIconStyle = style({
  display: 'inline-block',
  width: switchVars.icon.width,
  height: switchVars.icon.height,
  backgroundColor: '#ffffff',
  borderRadius: baseToken.radius.full,
  ...baseToken.transition.transform,
});

export const switchVariants = recipe({
  base: {
    width: switchVars.container.width,
    height: switchVars.container.height,
    display: 'flex',
    alignItems: 'center',
    paddingInline: baseToken.spacing[1],
    borderRadius: baseToken.radius.full,
    ...baseToken.transition.colors,
  },
  variants: {
    active: {
      true: {
        backgroundColor: colorToken['background.switch.enabled'],
        [`& > .${switchIconStyle}`]: {
          transform: switchVars.icon.transform,
          //   transform: `translateX(130%)`,
        },
      },
      false: {
        backgroundColor: colorToken['background.switch.disabled'],
      },
    },
    size: {
      sm: {
        vars: assignVars(switchVars, {
          icon: {
            width: baseToken.width[4],
            height: baseToken.height[4],
            transform: `translateX(130%)`,
          },
          container: {
            width: baseToken.width[9],
            height: baseToken.height[6],
          },
        }),
      },
      md: {
        vars: assignVars(switchVars, {
          icon: {
            width: baseToken.width[6],
            height: baseToken.height[6],
            transform: `translateX(130%)`,
          },
          container: {
            width: baseToken.width[14],
            height: baseToken.height[8],
          },
        }),
      },
      lg: {
        vars: assignVars(switchVars, {
          icon: {
            width: baseToken.width[8],
            height: baseToken.height[8],
            transform: `translateX(125%)`,
          },
          container: {
            width: baseToken.width[18],
            height: baseToken.height[10],
          },
        }),
      },
    },
  },
});
