/**
 * @category API
 * @module F1FuelHubEndpoint
 */

/** Interfaces */
import { IAbortableResponse } from '../../../utils/classes/api-client/ApiClientInterfaces';
import { IF1FuelHubResponseData } from './F1FuelHubInterfaces';

/** Classes */
import { ApiEndpoint } from '../common/ApiEndpoint';

/**
 * F1 FuelHub's general purpose API endpoint class.
 */
export class F1FuelHubEndpoint extends ApiEndpoint<IF1FuelHubResponseData> {
  /**
   * Parses the API JSON response casting the resulting object using the
   * F1 FuelHub API's response data interface.
   *
   * @param response - Abortable response with the promise from the fetched data
   * @returns - Parsed response data from the API response
   */
  responseTransformer(
    response: IAbortableResponse<Response>,
  ): IAbortableResponse<IF1FuelHubResponseData> {
    const promise = new Promise<IF1FuelHubResponseData>((resolve, reject) => {
      response.promise.then((response) => {
        const jsonParsingPromise = response.json();
        jsonParsingPromise
          .then((data: IF1FuelHubResponseData) => {
            resolve(data);
          })
          .catch(reject);
      });
      response.promise.catch(reject);
    });
    const transformedResponse: IAbortableResponse<IF1FuelHubResponseData> = {
      abort: response.abort,
      promise,
    };
    return transformedResponse;
  }
}
