import { QueryParams, ConvertedQueryParams } from "./types";
import axios from "axios";
export class PowerlinkAPI {
  private token: string;
  private baseUrl = "https://api.powerlink.co.il/api/v2/";

  constructor(token: string) {
    this.token = token;
  }

  async get(params: QueryParams) {
    const convertedQueryParams = this.getConvertedParams(params);
    try {
      const response = await axios.post(
        `${this.baseUrl}/query`,
        convertedQueryParams,
        {
          headers: { tokenid: this.token },
        }
      );
      return response.data;
    } catch (ex) {
      console.log(ex);
    }
  }

  async update(objectType: number, objectId: string, data: object) {
    try {
      const updatedRecord = await axios.put(
        `${this.baseUrl}/record/${objectType}/${objectId}`,
        data,
        { headers: { tokenid: this.token } }
      );
      return updatedRecord.data;
    } catch (ex) {
      console.log(ex);
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
