export const CHIP_VARIANTS = {
  HISTORY: 'history',
  SYNONYM: 'synonym',
} as const;
export type ChipVariants = (typeof CHIP_VARIANTS)[keyof typeof CHIP_VARIANTS];
