import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'reelly/1.0.0 (api/6.1.3)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Returns a paginated list of properties with optional filtering
   *
   * @summary Get list of properties
   */
  getProperties(metadata?: types.GetPropertiesMetadataParam): Promise<FetchResponse<200, types.GetPropertiesResponse200>> {
    return this.core.fetch('/properties', 'get', metadata);
  }

  /**
   * Returns detailed information about a specific property
   *
   * @summary Get property details
   */
  getPropertiesProperty_id(metadata: types.GetPropertiesPropertyIdMetadataParam): Promise<FetchResponse<200, types.GetPropertiesPropertyIdResponse200>> {
    return this.core.fetch('/properties/{property_id}', 'get', metadata);
  }

  /**
   * Returns property markers for map display
   *
   * @summary Get property markers
   */
  getPropertyMarkers(metadata?: types.GetPropertyMarkersMetadataParam): Promise<FetchResponse<200, types.GetPropertyMarkersResponse200>> {
    return this.core.fetch('/property-markers', 'get', metadata);
  }

  /**
   * Returns a list of available countries
   *
   * @summary Get available countries
   */
  getCountries(): Promise<FetchResponse<200, types.GetCountriesResponse200>> {
    return this.core.fetch('/countries', 'get');
  }

  /**
   * Returns a list of available project statuses
   *
   * @summary Get project statuses
   */
  getProjectStatuses(): Promise<FetchResponse<200, types.GetProjectStatusesResponse200>> {
    return this.core.fetch('/project-statuses', 'get');
  }

  /**
   * Returns a list of available areas
   *
   * @summary Get areas
   */
  getAreas(metadata?: types.GetAreasMetadataParam): Promise<FetchResponse<200, types.GetAreasResponse200>> {
    return this.core.fetch('/areas', 'get', metadata);
  }

  /**
   * Returns a list of available sale statuses
   *
   * @summary Get sale statuses
   */
  getSaleStatuses(): Promise<FetchResponse<200, types.GetSaleStatusesResponse200>> {
    return this.core.fetch('/sale-statuses', 'get');
  }

  /**
   * Returns a list of available unit bedroom configurations
   *
   * @summary Get unit bedroom configurations
   */
  getUnitBedrooms(): Promise<FetchResponse<200, types.GetUnitBedroomsResponse200>> {
    return this.core.fetch('/unit-bedrooms', 'get');
  }

  /**
   * Returns a list of available unit types
   *
   * @summary Get unit types
   */
  getUnitTypes(): Promise<FetchResponse<200, types.GetUnitTypesResponse200>> {
    return this.core.fetch('/unit-types', 'get');
  }

  /**
   * Returns a list of regions with coordinates
   *
   * @summary Get regions
   */
  getRegions(): Promise<FetchResponse<200, types.GetRegionsResponse200>> {
    return this.core.fetch('/regions', 'get');
  }

  /**
   * Returns a list of available developers
   *
   * @summary Get developers
   */
  getDevelopers(metadata?: types.GetDevelopersMetadataParam): Promise<FetchResponse<200, types.GetDevelopersResponse200>> {
    return this.core.fetch('/developers', 'get', metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { GetAreasMetadataParam, GetAreasResponse200, GetCountriesResponse200, GetDevelopersMetadataParam, GetDevelopersResponse200, GetProjectStatusesResponse200, GetPropertiesMetadataParam, GetPropertiesPropertyIdMetadataParam, GetPropertiesPropertyIdResponse200, GetPropertiesResponse200, GetPropertyMarkersMetadataParam, GetPropertyMarkersResponse200, GetRegionsResponse200, GetSaleStatusesResponse200, GetUnitBedroomsResponse200, GetUnitTypesResponse200 } from './types';
