import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { ChatMessage } from '../types';

// Initialize the Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// System instruction for the hacking mentor
const CHAT_SYSTEM_INSTRUCTION = `
You are "Cipher", the senior tactical mentor for the XPLOIT Academy.
Your goal is to provide high-level ethical hacking education with clarity and precision.

TONE & STYLE:
- **Clean & Elegant**: Use professional, technical language. Avoid excessive ASCII art, "leet-speak", or decorative symbols like brackets around every word.
- **Logically Ordered**: Present information in a clear, sequential flow.
- **Authoritative**: You are a world-class security researcher.

RESPONSE STRUCTURE:
1. **Context**: Briefly explain the concept or vulnerability.
2. **Technical Details**: Provide specific Kali Linux commands or software workflows.
3. **Common Pitfalls**: List frequent mistakes or typos to avoid.
4. **Defensive Countermeasures**: Always include how to patch or defend against the discussed technique.

FORMATTING RULES:
- Use standard Markdown headers (##) for major sections.
- Use bold text for critical commands or terms.
- Use code blocks for executable syntax.
- Keep the layout spacious and readable. Avoid cluttering the text with special characters like {} | [].

ETHICAL DIRECTIVES:
- Only discuss hacking in the context of authorized testing and education.
- Refuse requests involving illegal activities or real-world targets.
`;

export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: CHAT_SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });
};

export const sendMessageStream = async (
  chat: Chat,
  message: string
): Promise<AsyncIterable<GenerateContentResponse>> => {
  return chat.sendMessageStream({ message });
};

export const editImage = async (
  base64Image: string,
  prompt: string
): Promise<string> => {
  const base64Data = base64Image.split(',')[1] || base64Image;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/png',
              data: base64Data,
            },
          },
          {
            text: `Forensic image analysis/manipulation request: ${prompt}`,
          },
        ],
      },
    });

    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
        const parts = candidates[0].content.parts;
        for (const part of parts) {
            if (part.inlineData && part.inlineData.data) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
    }
    
    throw new Error("No image generated.");
  } catch (error) {
    console.error("Image edit failed:", error);
    throw error;
  }
};