export const onTranscriptionComplete = `
  subscription OnTranscriptionComplete($fileName: String!) {
    onTranscriptionComplete(fileName: $fileName) {
      error
      fileName
      transcribedText
    }
  }
`;
