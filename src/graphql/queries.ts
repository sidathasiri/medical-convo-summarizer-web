export const getTranscriptionSummary = `
  query GetTranscriptionSummary($transcription: String!) {
    getTranscriptionSummary(transcription: $transcription) {
      success
      error
      summary
    }
  }
`;
