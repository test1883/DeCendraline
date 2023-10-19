const { PromptTemplate } = require("langchain/prompts");
const { ChatOpenAI } = require("langchain/chat_models/openai");
const { RunnableSequence } = require("langchain/schema/runnable");
const { StringOutputParser } = require("langchain/schema/output_parser");

const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const promptTemplate = PromptTemplate.fromTemplate(
  "you are an extremely adventurous person who has a great experience in various challenges, challenge the user based on duration - {duration} hours, type - {type}, difficulty - {difficulty} in {place}, be specific about it and give a unique challenge. give just one challenge. keep human capabilities in mind and keep the challenge realistic. include all the human necessities in the duration"
);
const outputParser = new StringOutputParser();

const chain = RunnableSequence.from([promptTemplate, model, outputParser]);

const generateChallenge = async (duration, type, difficulty, place) => {
  try {
    console.log(chain);
    const res = await chain.invoke({ duration, type, difficulty, place });
    return res;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  generateChallenge,
};
