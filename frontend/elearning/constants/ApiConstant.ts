export const REQUEST_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
} as const;

export const HEADER_X_AUTH_CONTENT = 'x-auth-content';

export const API_RESPONSE_STATUS_CODE = {
  SUCCESS: 200,
};

export const API_STATUS_SSR = {
  SUCCESS: 'success',
  ERROR: 'error',
  PENDING: 'pending',
};

export const ERROR_CODES = {
  RECORD_NOT_UNIQUE: 'RECORD_NOT_UNIQUE'
}