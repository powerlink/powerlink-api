import { QueryParams, ConvertedQueryParams } from "./types";
import axios from "axios";
export class PowerlinkAPI {
  private token: string;
  private baseUrl = "https://api.powerlink.co.il/api";

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
      console.log(response.data);
    } catch (ex) {
      console.log(ex);
    }
  }

  update(objectType: number, objectId: string, data: object) {
    axios.put(
      `https://api.powerlink.co.il/api/record/${objectType}/${objectId}`,
      data,
      { headers: { tokenid: this.token } }
    );
  }

  getConvertedParams = ({
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
