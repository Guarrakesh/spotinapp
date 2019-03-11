export const ENTITY_VIEW = 'ENTITY_VIEW';

export const entityView = (entityType, entityId, params) => ({
  type: ENTITY_VIEW,
  payload: { entityType, entityId, params},
});