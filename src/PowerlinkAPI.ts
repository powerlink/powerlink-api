import axios from "axios";
import { v4 } from "uuid";
import { QueryParams, ConvertedQueryParams } from "./types";
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
        const response = await this.api("get", convertedQueryParams);
        // const response = await window.parent.plapi.query(convertedQueryParams);
        return response;
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  async api(method: string, params: object) {
    return new Promise((resolve, reject) => {
      const requestId = v4();
      if (this.isBrowser) {
        window.parent.postMessage({ method, params, requestId }, "*");
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
  async create(data: object, objectType: number) {
    try {
      if (this.token) {
        const newRecord = await axios.post(
          `${this.baseUrlV2}/record/${objectType}`,
          data,
          { headers: { tokenid: this.token } }
        );
        return newRecord.data;
      } else {
        const response = await window.parent.plapi.create(data, objectType);
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
          `${this.baseUrlV2}/record/${objectType}/${objectId}`,
          { headers: { tokenid: this.token } }
        );
        return response.data;
      } else {
        // const response = await window.parent.postMessage(
        //   { type: "delete", url: "" },
        //   "*"
        // );
        // return response;
      }
    } catch (ex) {
      // console.log(ex);
    }
  }

  addListener(listenerName: string, callback: Function) {
    this.listeners[listenerName] = callback;
  }

  messageListener(e: MessageEvent) {
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
