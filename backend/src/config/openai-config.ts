export const configureOpenAI = () => {
  return {
    apiKey: process.env.OPENAI_SECRET_KEY,
    organization: process.env.OPENAI_ORG_ID,
  };
};
