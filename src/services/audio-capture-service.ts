import { AudioStream } from "@aws-sdk/client-transcribe-streaming";

export class AudioCaptureService {
  private stream?: MediaStream;
  private audioContext?: AudioContext;
  private source?: MediaStreamAudioSourceNode;
  private processor?: ScriptProcessorNode;
  private queue: Float32Array[] = [];

  async *createAudioStream(): AsyncGenerator<AudioStream> {
    try {
      // Get audio from the user's microphone
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      // Initialize audio processing
      this.audioContext = new AudioContext({ sampleRate: 16000 });
      this.source = this.audioContext.createMediaStreamSource(this.stream);
      this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);

      this.source.connect(this.processor);
      this.processor.connect(this.audioContext.destination);

      // Set up audio processing callback
      this.processor.onaudioprocess = (e) => {
        this.queue.push(e.inputBuffer.getChannelData(0).slice());
      };

      // Stream audio chunks
      try {
        while (true) {
          if (this.queue.length > 0) {
            const floatChunk = this.queue.shift()!;
            // Convert Float32Array [-1,1] to Int16 PCM
            const pcmChunk = new Int16Array(floatChunk.length);
            for (let i = 0; i < floatChunk.length; i++) {
              let s = Math.max(-1, Math.min(1, floatChunk[i]));
              pcmChunk[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
            }
            yield {
              AudioEvent: { AudioChunk: new Uint8Array(pcmChunk.buffer) },
            };
          } else {
            await new Promise((res) => setTimeout(res, 10));
          }
        }
      } finally {
        // Final empty chunk
        yield { AudioEvent: { AudioChunk: new Uint8Array(0) } };
        this.cleanup();
      }
    } catch (error) {
      console.error("Error in audio capture:", error);
      throw error;
    }
  }

  private cleanup() {
    if (this.processor) {
      this.processor.disconnect();
    }
    if (this.source) {
      this.source.disconnect();
    }
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }
    if (this.audioContext) {
      this.audioContext.close();
    }
  }

  stop() {
    this.cleanup();
  }
}
