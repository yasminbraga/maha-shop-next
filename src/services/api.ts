import { getAPIClient } from "./axios";

// chamadas a partir do browser (que nao sao server side handling)
export const api = getAPIClient();
