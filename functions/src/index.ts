import * as functions from "firebase-functions";
import { Election } from "./Election";

export const getResults = functions.pubsub.schedule("*/10 * * * *").onRun(async _context => {
  await Election.postResults();
});
