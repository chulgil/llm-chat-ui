export class StreamingTextResponse extends Response {
  constructor(stream: ReadableStream, init?: ResponseInit) {
    super(stream, {
      ...init,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        ...init?.headers
      }
    })
  }
}
