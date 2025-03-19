export type FetchTransform<T> = (param: any) => T;
export type FetchErrorHandlerCallback = (error: Error, data?: any) => void;

export interface FetchOptions<T> {
  baseUrl?: string; // custom base URL
  cacheKeys?: (string | number)[]; // cache keys
  isForced?: boolean; // is ignore cache
  isLanguageFile?: boolean; // is fetching language file
  isOnStoveFileUpload?: boolean; // is uploading image to OnStove
  mockFile?: string; // ex: /_nuxt/mocks/notice-countries.mock.json
  shouldShowLoading?: boolean; // show application loading indicator
  requestParamsTransform?: (params: any) => any; // transform request params
  shouldAutoTransformRequestParams?: boolean; // auto convert request params to snake_case, default = true
  requestBodyTransform?: (body: any) => any; // transform request body
  shouldAutoTransformRequestBody?: boolean; // auto convert request body to snake_case, default = true
  responseTransform?: FetchTransform<T>; // transform response result
  shouldAutoTransformResponseData?: boolean; // auto convert response data to camelCase, default = true
  shouldIncludeSecurityInfo?: boolean; // add ts and ticket param
  onError?: FetchErrorHandlerCallback; // custom error handler
  params?: { [key: string]: any };
  body?: { [key: string]: any };
  headers?: { [key: string]: any };
  responseType?: 'json' | 'arraybuffer' | 'document' | 'text' | 'stream' | 'blob';
  method?:
  | 'get'
  | 'head'
  | 'patch'
  | 'post'
  | 'put'
  | 'delete'
  | 'connect'
  | 'options'
  | 'trace'
  | 'GET'
  | 'HEAD'
  | 'PATCH'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE';
}
