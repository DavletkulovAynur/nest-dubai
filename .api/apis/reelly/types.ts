import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';

export type GetAreasMetadataParam = FromSchema<typeof schemas.GetAreas.metadata>;
export type GetAreasResponse200 = FromSchema<typeof schemas.GetAreas.response['200']>;
export type GetCountriesResponse200 = FromSchema<typeof schemas.GetCountries.response['200']>;
export type GetDevelopersMetadataParam = FromSchema<typeof schemas.GetDevelopers.metadata>;
export type GetDevelopersResponse200 = FromSchema<typeof schemas.GetDevelopers.response['200']>;
export type GetProjectStatusesResponse200 = FromSchema<typeof schemas.GetProjectStatuses.response['200']>;
export type GetPropertiesMetadataParam = FromSchema<typeof schemas.GetProperties.metadata>;
export type GetPropertiesPropertyIdMetadataParam = FromSchema<typeof schemas.GetPropertiesPropertyId.metadata>;
export type GetPropertiesPropertyIdResponse200 = FromSchema<typeof schemas.GetPropertiesPropertyId.response['200']>;
export type GetPropertiesResponse200 = FromSchema<typeof schemas.GetProperties.response['200']>;
export type GetPropertyMarkersMetadataParam = FromSchema<typeof schemas.GetPropertyMarkers.metadata>;
export type GetPropertyMarkersResponse200 = FromSchema<typeof schemas.GetPropertyMarkers.response['200']>;
export type GetRegionsResponse200 = FromSchema<typeof schemas.GetRegions.response['200']>;
export type GetSaleStatusesResponse200 = FromSchema<typeof schemas.GetSaleStatuses.response['200']>;
export type GetUnitBedroomsResponse200 = FromSchema<typeof schemas.GetUnitBedrooms.response['200']>;
export type GetUnitTypesResponse200 = FromSchema<typeof schemas.GetUnitTypes.response['200']>;
