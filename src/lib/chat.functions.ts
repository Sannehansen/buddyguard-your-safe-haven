import { createServerFn } from "@tanstack/react-start";
import { streamText } from "ai";
import { z } from "zod";

const ChatInput = z.object({
  messages: z.array(
    z.object({
      role: z.union([z.literal("user"), z.literal("assistant")]),
      content: z.string(),
    }),
  ),
  context: z.string(),
});

export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ChatInput.parse(input))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");
    const gateway = createLovableAiGatewayProvider(key);

    const result = streamText({
      model: gateway("google/gemini-3.7-flash"),
      system: [
        "You are Buddyguard, a calm patient assistant for people in complex illness journeys.",
        "Answer in English, warm, plain language, short paragraphs, max ~90 words.",
        "Use only the patient's own logged data below when referring to patterns; never invent numbers.",
        "Never diagnose or give treatment advice. Point to talking with the care team when relevant.",
        "",
        "PATIENT DATA:",
        data.context,
      ].join("\n"),
      messages: data.messages,
    });

    return { text: await result.text };
  });
