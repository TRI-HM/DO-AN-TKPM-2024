import { apiCaller } from "../../apis/apiCaller";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

export const saveconversation = async (prompt: string): Promise<string> => {
  try {
    return await apiCaller(`${BASE_URL}/history`, "POST", {});
  } catch (error) {
    console.error("Error saveconversation:", error);
    return "Sorry, an error occurred while saveconversation.";
  }
};

export const getHistories = async (uuid: string): Promise<any> => {
  try {
    return await apiCaller(`${BASE_URL}/history/${uuid}`, "GET", {});
  } catch (error) {
    console.error("Error getHistories:", error);
    return "Sorry, an error occurred while getHistories.";
  }
};

export const saveHistories = async (user_uuid: string): Promise<any> => {
  try {
    return await apiCaller(`${BASE_URL}/history/save`, "POST", {
      user_uuid: user_uuid,
    });
  } catch (error) {
    console.error("Error saveHistories:", error);
    return "Sorry, an error occurred while saveHistories.";
  }
};

export const getLogs = async (prompt: string): Promise<string> => {
  try {
    return await apiCaller(`${BASE_URL}/history`, "GET", {});
  } catch (error) {
    console.error("Error getLogs:", error);
    return "Sorry, an error occurred while getLogs";
  }
};

export const getLog = async (uuid: string): Promise<string> => {
  try {
    return await apiCaller(`${BASE_URL}/log/${uuid}`, "GET", {});
  } catch (error) {
    console.error("Error getLog:", error);
    return "Sorry, an error occurred while get Log.";
  }
};

export const saveLog = async ({
  number_sentence,
  sentences,
  history_uuid,
}: any): Promise<string> => {
  try {
    const response = apiCaller(`${BASE_URL}/history`, "POST", {
      number_sentence: number_sentence,
      sentences: sentences,
      history_uuid: history_uuid,
    });
    return response;
  } catch (error) {
    console.error("Error saveLog:", error);
    return "Sorry, an error occurred while saveLog.";
  }
};
