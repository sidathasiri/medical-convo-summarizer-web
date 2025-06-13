export const getBabyDevelopmentInfo = `
  query GetBabyDevelopmentInfo($ageInMonths: Int!) {
    getBabyDevelopmentInfo(ageInMonths: $ageInMonths) {
      info
      success
      error
    }
  }
`;
