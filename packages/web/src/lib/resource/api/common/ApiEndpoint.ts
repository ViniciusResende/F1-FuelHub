/**
 * @category API
 * @module ApiCommon
 */

/** Enums */
import {
  HttpCredentialsEnum,
  HttpMethodEnum,
  HttpRequestCacheEnum,
  HttpRequestModeEnum,
  HttpRequestRedirectEnum,
  HttpRequestReferrerPolicyEnum,
} from '@/lib/utils/classes/api-client/ApiClientEnums';

/** Interfaces */
import { IApiClientRequestParams } from '@/lib/utils/classes/api-client/ApiClientInterfaces';

/** Classes */
import { ApiClientEndpoint } from '@/lib/utils/classes/api-client/ApiClientEndpoint';

/**
 * Abstract API Endpoint class which adds common implementation for the request
 * builder.
 */
export abstract class ApiEndpoint<R> extends ApiClientEndpoint<R> {
  /**
   * Builds the Request object using the default headers defined for the API,
   * for the endpoint and for the request itself.
   *
   * Also initializes the Request object with common configuration for caching,
   * mode, redirection and referrer policy.
   *
   * @param requestParams - Parameters to be applied to the transformation
   * @returns - Transformed Request object
   */
  requestBuilder(
    requestParams: IApiClientRequestParams = {}
  ): [string, RequestInit] {
    const { defaultParams = {} } = this.endpoint;
    const headers = new Headers(
      Object.assign(
        Object.fromEntries(this.apiClient.headers.entries()),
        Object.fromEntries(defaultParams.headers?.entries() || []),
        Object.fromEntries(requestParams.headers?.entries() || [])
      )
    );

    const requestInit: RequestInit = {
      body: JSON.stringify(requestParams.body) || null,
      cache: HttpRequestCacheEnum.DEFAULT,
      credentials: HttpCredentialsEnum.SAME_ORIGIN,
      headers,
      integrity: '',
      keepalive: false,
      method: requestParams.method || HttpMethodEnum.GET,
      mode: HttpRequestModeEnum.CORS,
      redirect: HttpRequestRedirectEnum.FOLLOW,
      referrer: '',
      referrerPolicy:
        HttpRequestReferrerPolicyEnum.STRICT_ORIGIN_WHEN_CROSS_ORIGIN,
      signal: undefined,
    };

    return [this.apiClient.baseUrl, requestInit];
  }
}