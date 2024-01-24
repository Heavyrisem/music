import { createThemeContract, createVar, keyframes, style } from '@vanilla-extract/css';

import { baseToken, colorToken } from '@/theme/theme.css';

// export const contentVars = createThemeContract({})

export const slideDown = keyframes({
  from: {
    height: baseToken.height[0],
  },
  to: {
    height: baseToken.height.auto,
  },
});

export const slideUp = keyframes({
  from: {
    height: baseToken.height.auto,
  },
  to: {
    height: baseToken.height[0],
  },
});

export const contentStyle = style({
  height: baseToken.height[0],
  overflow: 'hidden',
  borderColor: colorToken['border.primary'],
  borderTopStyle: 'solid',
  borderTopWidth: baseToken.spacing['0.5'],
  selectors: {
    '&[data-open="true"]': {
      // animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
      height: baseToken.height.auto,
      paddingBlock: baseToken.spacing[4],
      paddingInline: baseToken.spacing[2],
    },
    '&[data-open="false"]': {
      // animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
      height: baseToken.height[0],
      borderStyle: 'none',
    },
    '&:last-child': {
      borderColor: colorToken['border.primary'],
      borderBottomStyle: 'solid',
      borderBottomWidth: baseToken.spacing['0.5'],
    },
  },
});

export const triggerStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  borderColor: colorToken['border.primary'],
  borderTopStyle: 'solid',
  borderTopWidth: baseToken.spacing['0.5'],
  padding: baseToken.spacing[2],
  cursor: 'pointer',
  ...baseToken.transition.colors,
  selectors: {
    '&:hover': {
      backgroundColor: colorToken['background.netural'],
    },
    '&:first-child': {
      // borderColor: colorToken["border.primary"],
      // borderTopStyle: "solid",
      // borderTopWidth: baseToken.spacing["0.5"],
    },
  },
});

export const triggerIconStyle = style({
  ...baseToken.transition.transform,
  selectors: {
    '[data-open="true"] &': {
      transform: `rotate(0deg)`,
    },
    '[data-open="false"] &': {
      transform: `rotate(180deg)`,
    },
  },
});
