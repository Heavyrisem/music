import { defineProperties } from '@vanilla-extract/sprinkles';

import { fontSize } from '../token/font-size';
import { fontWeight } from '../token/font-weight';
import { conditions } from './conditions';

export const typoProperties = defineProperties({
  conditions,
  defaultCondition: 'all',
  properties: {
    fontSize,
    fontWeight,
  },
});
