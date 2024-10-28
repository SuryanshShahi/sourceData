import { API_CONSTANTS } from "./apiContants";
import axiosInstance from "./axiosInstance";

export const getSourceData = async (tableName: string) => {
  // const res = await axiosInstance().get(API_CONSTANTS.getSourceData(tableName));
  // return res?.data?.response;
  return {
    table: "users",
    fields: [
      {
        name: "id",
        type: "integer",
      },
      {
        name: "username",
        type: "string",
      },
      {
        name: "email",
        type: "string",
      },
      {
        name: "created_at",
        type: "datetime",
      },
    ],
  };
};
export const getMasterFields = async () => {
  // const res = await axiosInstance().get(API_CONSTANTS.getMasterFields);
  // return res?.data?.response;
  return {
    table: "CSUMaster",
    fields: [
      {
        name: "id",
        type: "integer",
      },
      {
        name: "username",
        type: "string",
      },
      {
        name: "email",
        type: "string",
      },
      {
        name: "created_at",
        type: "datetime",
      },
    ],
  };
};
