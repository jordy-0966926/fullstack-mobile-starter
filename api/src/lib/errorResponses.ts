import { ErrorSchema } from "@/schemas/helpers";

const jsonError = {
  content: { "application/json": { schema: ErrorSchema } },
};

const errors = {
  400: { description: "Bad Request", ...jsonError },
  401: { description: "Unauthorized", ...jsonError },
  403: { description: "Forbidden", ...jsonError },
  404: { description: "Not Found", ...jsonError },
  409: { description: "Conflict", ...jsonError },
  500: { description: "Internal Server Error", ...jsonError },
};

export const getErrorResponses = {
  400: errors[400],
  401: errors[401],
  403: errors[403],
  404: errors[404],
  500: errors[500],
};

export const createErrorResponses = {
  400: errors[400],
  401: errors[401],
  403: errors[403],
  409: errors[409],
  500: errors[500],
};

export const updateErrorResponses = {
  400: errors[400],
  401: errors[401],
  403: errors[403],
  404: errors[404],
  409: errors[409],
  500: errors[500],
};

export const deleteErrorResponses = {
  401: errors[401],
  403: errors[403],
  404: errors[404],
  500: errors[500],
};

export { errors };
