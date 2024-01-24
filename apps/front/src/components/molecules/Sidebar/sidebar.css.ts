import { style } from '@vanilla-extract/css';

import { baseToken, colorToken } from '@/theme/theme.css';

export const sidebarBaseStyle = style({
  padding: baseToken.spacing['2.5'],
  borderRadius: baseToken.radius.md,
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      backgroundColor: colorToken['background.sidebar.hover'],
    },
    "&[data-depth='2']": {
      paddingLeft: baseToken.spacing['4'],
    },
    "&[data-depth='3']": {
      paddingLeft: baseToken.spacing['6'],
    },
    "&[data-depth='4']": {
      paddingLeft: baseToken.spacing['8'],
    },
  },
});

export const sidebarGroupContainerStyle = style({});

export const sidebarGroupLabelStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
});
export const sidebarGroupLabelIconStyle = style({});

export const sidebarItemStyle = style({
  selectors: {
    "&[data-active='true']": {
      backgroundColor: colorToken['background.sidebar.active'],
    },
  },
});
