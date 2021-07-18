import { QueryParams, ConvertedQueryParams } from "./types";
import axios from "axios";
export class PowerlinkAPI {
  private token?: string;
  private baseUrlV1 = "https://app.powerlink.co.il/api/";
  private baseUrlV2 = "https://app.powerlink.co.il/api/v2/";

  constructor(token?: string) {
    this.token = token;
  }

  async get(params: QueryParams) {
    const convertedQueryParams = this.getConvertedParams(params);
    try {
      if (this.token) {
        const response = await axios.post(
          `${this.baseUrlV1}/query`,
          convertedQueryParams,
          {
            headers: { tokenid: this.token },
          }
        );
        return response.data;
      } else {
        const response = await axios.post(
          `${this.baseUrlV1}/query`,
          convertedQueryParams
        );
        return response.data;
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  async update(objectType: number, objectId: string, data: object) {
    if (this.token) {
      try {
        const updatedRecord = await axios.put(
          `${this.baseUrlV2}/record/${objectType}/${objectId}`,
          data,
          { headers: { tokenid: this.token } }
        );
        return updatedRecord.data;
      } catch (ex) {
        console.log(ex);
      }
    } else {
      try {
        const updatedRecord = await axios.put(
          `${this.baseUrlV2}/record/${objectType}/${objectId}`,
          data
        );
        return updatedRecord.data;
      } catch (ex) {
        console.log(ex);
      }
    }
  }

  private getConvertedParams = ({
    objectType,
    pageSize,
    pageNumber,
    conditions,
    fields,
    sortBy,
    sortType,
  }: QueryParams): ConvertedQueryParams => {
    return {
      objecttype: objectType,
      page_size: pageSize,
      page_number: pageNumber,
      query: conditions,
      sort_by: sortBy,
      sort_type: sortType,
      fields,
    };
  };
}
