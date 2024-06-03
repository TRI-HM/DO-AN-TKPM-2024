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
    // return await apiCaller(`${BASE_URL}/history/${uuid}`, "GET", {});
    return new Promise((resolve, reject) => {
      resolve({
        data: {
          histories: [
            {
              text: "30/05/2024",
              uuid: "1",
            },
            {
              text: "31/05/2024",
              uuid: "2",
            },
            {
              text: "1/06/2024",
              uuid: "3",
            },
            {
              text: "2/06/2024",
              uuid: "4",
            },
            {
              text: "3/06/2024",
              uuid: "5",
            },
            {
              text: "4/06/2024",
              uuid: "6",
            },
            {
              text: "5/06/2024",
              uuid: "7",
            },
            {
              text: "6/06/2024",
              uuid: "8",
            },
          ],
        },
      });
    });
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

export const getConversation = async (prompt: string): Promise<any> => {
  try {
    // return await apiCaller(`${BASE_URL}/history`, "GET", {});
    return new Promise((resolve, reject) => {
      resolve({
        data: {
          conversations: [
            {
              role: "user",
              content: "Help me create a plan for a vegetable garden ?",
              uuid: "1",
            },
            {
              role: "bott",
              content: `Certainly! Planning a vegetable garden is an exciting endeavor.
                Let’s get started with some essential steps: <br /> 1. Visit
                Other Gardens: Start by visiting nearby vegetable gardens.
                Observe what grows well in your area and make a list of the
                vegetables you and your family enjoy eating. <br /> 2. Know Cool
                and Warm Season Vegetables: Understand which vegetables thrive
                in cool weather (like lettuce, spinach, and peas) and which
                prefer warm weather (such as tomatoes, peppers, and squash).
                This knowledge will help you plan your planting schedule. <br />
                3.Know Your Growing Season: Determine the length of your growing
                season. This information will guide your choice of crops and
                planting times. For example, if you have a short growing season,
                focus on quick-maturing vegetables. <br /> 4.Choose Seeds or
                Transplants: Decide whether you’ll start from seeds or purchase
                transplants. Some vegetables, like carrots and beans, are best
                grown from seeds directly in the garden, while others, like
                tomatoes and peppers, benefit from starting indoors as
                transplants.`,
              uuid: "2",
            },
          ],
        },
      });
    });
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
