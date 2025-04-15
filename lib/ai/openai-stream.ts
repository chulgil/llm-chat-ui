import { OpenAI } from "openai"

export async function OpenAIStream(
  response: AsyncIterable<OpenAI.Chat.Completions.ChatCompletionChunk>
) {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content || ""
        if (content) {
          controller.enqueue(encoder.encode(content))
        }
      }
      controller.close()
    }
  })

  return stream
}
