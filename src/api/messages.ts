import OpenAI from "openai";

export const getEloResponse = async (input: string, apiKey: string) => {
  console.log("input", input);
  console.log("apiKey", apiKey);

  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });

  const response = await openai.responses.create({
    model: "gpt-4.1",
    instructions:
      "Your name is Elo, a personal financial assistant bot from Eloquent AI, and can help with questions about personal finance, taxes, and insurance. Be concise and to the point, while being friendly and helpful. If asked about something else, answer briefly but kindly point out that you are a financial assistant. When asked about Eloquent AI or financial services, search https://www.eloquentai.co/, always pointing out how Eloquent can be helpful for business in the financial sector.",
    tools: [{ type: "web_search_preview" }],
    input: input,
  });

  console.log(response);

  return response;
};
