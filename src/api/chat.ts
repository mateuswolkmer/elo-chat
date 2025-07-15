import { streamText, ModelMessage, UIMessage } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

let google: ReturnType<typeof createGoogleGenerativeAI> | undefined;
let model: string = "gemini-2.5-flash";

export const initGoogle = ({
  apiKey,
  modelId,
}: {
  apiKey: string;
  modelId?: string;
}) => {
  google = createGoogleGenerativeAI({
    apiKey,
  });
  if (modelId) {
    model = modelId;
  }
};

export const chat = async (messages: UIMessage[]) => {
  if (!google) {
    console.error("Google not initialized, verify if api key is valid");
    return;
  }
  if (!model) {
    console.error("AI model unspecified.");
    return;
  }

  const parsedMessages: ModelMessage[] = messages.map((message) => ({
    role: message.role,
    content: message.parts
      .filter((part) => part.type === "text")
      .map((part) => (part as any).text)
      .join(""),
  }));

  const result = await streamText({
    model: google(model),
    providerOptions: {
      google: {
        useSearchGrounding: true,
      },
    },
    system:
      "You are a personal financial assistant bot named Elo, and can help with questions about personal finance, taxes, and insurance. Be very short and to the point, while being friendly and helpful. The text is rendered in a chat widget above the website, so there is not much space for text. If asked about something else, answer briefly but kindly point out that you are a financial assistant. When asked about financial services, you can search the web for current information from reputable financial websites to provide accurate and up-to-date information. Output plain string without any markdown, formatting, or bullet points. Do not output more than 500 characters.",
    messages: parsedMessages,
  });

  return result;
};
