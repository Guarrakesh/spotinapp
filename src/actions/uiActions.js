export const START_OPTIMISTIC_MODE = 'START_OPTIMISTIC_MODE';
export const STOP_OPTIMISTIC_MODE = 'STOP_OPTIMISTIC_MODE';

export const startOptimisticMode = () => ({
  type: START_OPTIMISTIC_MODE,
});

export const stopOptimisticMode = () => ({
  type: STOP_OPTIMISTIC_MODE,
});
