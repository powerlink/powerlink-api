import axios from "axios";
import { QueryParams, ConvertedQueryParams } from "./types";
export class plapi {
  private token?: string;
  private baseUrlV1 = "https://api.powerlink.co.il/api/";
  private baseUrlV2 = "https://api.powerlink.co.il/api/v2/";

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
          { headers: { tokenid: this.token } }
        );
        return response.data;
      } else {
        const response = await window.parent.plapi.query(convertedQueryParams);
        return response;
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  async update(objectType: number, objectId: string, data: object) {
    try {
      if (this.token) {
        const updatedRecord = await axios.put(
          `${this.baseUrlV2}/record/${objectType}/${objectId}`,
          data,
          { headers: { tokenid: this.token } }
        );
        return updatedRecord.data;
      } else {
        const response = await window.parent.plapi.update(
          objectType,
          objectId,
          data
        );
        return response;
      }
    } catch (ex) {
      // console.log(ex);
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
