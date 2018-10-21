import {CREATE} from "./types";
import {CRUD_CREATE} from "./dataActions";

export const createRequest = (userId, event, location, maxDistance, numOfPeople, userPosition, note) => ({

  type: CRUD_CREATE,
  payload: {
    userId,
    event,
    location,
    maxDistance,
    numOfPeople,
    userPosition,
    note,
  },
  meta: {
    basePath: "/users/"+userId,
    resource: "requests",
    fetch: CREATE,
    onSuccess: {
      notification: {
        body: "Richiesta inviata con successo!",
        level: "success",
        messageArgs: {
          smart_count: 1,
        },
      },
    },
  },
});