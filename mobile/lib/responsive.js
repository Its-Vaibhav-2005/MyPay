import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device (e.g. iPhone 11 Pro / X)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

/**
 * Scales a size based on the screen width.
 * Useful for padding, margin, width.
 */
const scale = size => (SCREEN_WIDTH / guidelineBaseWidth) * size;

/**
 * Scales a size based on the screen height.
 * Useful for height.
 */
const verticalScale = size => (SCREEN_HEIGHT / guidelineBaseHeight) * size;

/**
 * Scales a size with a factor to avoid excessive scaling on large screens.
 * Useful for font sizes and consistent spacing.
 * @param {number} size - The size to scale
 * @param {number} factor - The factor (0.5 is default) - 0 means no scaling, 1 means full scaling
 */
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

/**
 * Returns a percentage of the screen width.
 * @param {number} percentage - Percentage as a number (e.g. 50 for 50%)
 */
const widthPct = percentage => (SCREEN_WIDTH * percentage) / 100;

/**
 * Returns a percentage of the screen height.
 * @param {number} percentage - Percentage as a number (e.g. 50 for 50%)
 */
const heightPct = percentage => (SCREEN_HEIGHT * percentage) / 100;

export { 
  scale, 
  verticalScale, 
  moderateScale, 
  widthPct, 
  heightPct, 
  SCREEN_WIDTH, 
  SCREEN_HEIGHT 
};
