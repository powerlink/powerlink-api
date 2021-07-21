import axios from "axios";
import { v4 } from "uuid";
import { QueryParams, ConvertedQueryParams, ViewRecordsConfig } from "./types";
export class plapi {
  private token?: string;
  private listeners: { [key: string]: Function };
  private baseUrlV1 = "https://api.powerlink.co.il/api/";
  private baseUrlV2 = "https://api.powerlink.co.il/api/v2/";
  private isBrowser = typeof window !== "undefined";

  constructor(token?: string) {
    this.token = token;
    this.listeners = {};
    this.messageListener = this.messageListener.bind(this);
    if (this.isBrowser && !this.token) {
      window?.addEventListener("message", this.messageListener, false);
    }
  }

  private async api(func: string, params: object) {
    return new Promise((resolve, reject) => {
      const requestId = v4();
      if (this.isBrowser) {
        window.parent.postMessage({ func, params, requestId }, "*");
        this.addListener(
          requestId,
          (response: { data: object; error?: string }) => {
            if (response.error) {
              reject(response.error);
            } else {
              resolve(response.data);
            }
          }
        );
      } else {
        reject("Invalid Environment");
      }
    });
  }

  async query(params: QueryParams) {
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
        const response = await this.api("query", convertedQueryParams);
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
        const response = await this.api("update", {
          objectType,
          objectId,
          data,
        });
        return response;
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  async create(objectType: number, data: object) {
    try {
      if (this.token) {
        const newRecord = await axios.post(
          `${this.baseUrlV2}/record/${objectType}`,
          data,
          { headers: { tokenid: this.token } }
        );
        return newRecord.data;
      } else {
        const response = await this.api("create", { objectType, data });
        return response;
      }
    } catch (ex) {
      // console.log(ex);
    }
  }

  async delete(objectType: number, objectId: string) {
    try {
      if (this.token) {
        const response = await axios.delete(
          `${this.baseUrlV1}/record/${objectType}/${objectId}`,
          { headers: { tokenid: this.token } }
        );
        return response.data;
      } else {
        const response = await this.api("delete", { objectType, objectId });
        return response;
      }
    } catch (ex) {
      // console.log(ex);
    }
  }

  async getViews(objectType: number) {
    try {
      if (this.token) {
        const response = await axios.get(
          `${this.baseUrlV2}/views/${objectType}`,
          { headers: { tokenid: this.token } }
        );
        return response.data;
      } else {
        const response = await this.api("getViews", { objectType });
        return response;
      }
    } catch (ex) {
      // console.log(ex);
    }
  }

  async getViewRecords(
    objectType: number,
    viewId: string,
    config: ViewRecordsConfig
  ) {
    try {
      if (this.token) {
        const response = await axios.post(
          `${this.baseUrlV2}/views/${objectType}/${viewId}`,
          config,
          { headers: { tokenid: this.token } }
        );
        return response.data;
      } else {
        const response = await this.api("getViewRecords", {
          objectType,
          viewId,
          config,
        });
        return response;
      }
    } catch (ex) {
      // console.log(ex);
    }
  }

  private addListener(listenerName: string, callback: Function) {
    this.listeners[listenerName] = callback;
  }

  private messageListener(e: MessageEvent) {
    const { requestId } = e.data;
    try {
      this.listeners[requestId](e.data);
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
