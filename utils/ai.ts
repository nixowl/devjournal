import Anthropic from '@anthropic-ai/sdk';
import { ChatAnthropic } from '@langchain/anthropic';
import { PromptTemplate } from '@langchain/core/prompts';
import { Document } from 'langchain/document';
import z from 'zod';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { requestAsyncStorage } from 'next/dist/client/components/request-async-storage.external';
import { loadQAStuffChain } from 'langchain/chains';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { VoyageEmbeddings } from '@langchain/community/embeddings/voyage';

const anthropic = new Anthropic();
const chatAnthropic = new ChatAnthropic({
  temperature: 0.9,
  modelName: 'claude-3-sonnet-20240229',
  maxTokens: 1024,
});

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    productivityScore: z.number().describe('judgement of the productivity of the activities in the text and rated on a scale from -10 to 10, where -10 is extremely unproductive, 0 is neutral, and 10 is extremely productive.'),
     title: z
      .string()
      .describe('A descriptive, creative title for the journal entry.'),
    summary: z
      .string()
      .describe(
        'quick summary of the entire journal entry. it should not be longer than a maximum of 3 sentences.'
      ),
    topic: z
      .string()
      .describe(
        'topics learned or mentioned in the journal entry in list format, separated by comma.'
      ),
    color: z
      .string()
      .describe(
        'a hexadecimal representing the journal entry. It can be a color representing the overall mood, or a color representing what has been learned, for example, the Typescript logo is blue, so on a day where the journal entry is mainly about Typescript, the color could be #0d5ee0. Although, if the journal entry is "I hate Typscript and never want to use it again", the main theme would be the mood, not the topic, so the color would be #c90c0c.'
      ),
  })
);

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! Do not add any text before or after the JSON response. \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  });

  const input = await prompt.format({
    entry: content,
  });

  console.log(input);
  return input;
};

export const analyze = async (content: any) => {
  const input = await getPrompt(content);
  const result = await anthropic.messages.create({
    model: 'claude-3-opus-20240229',
    max_tokens: 1024,
    messages: [{ role: 'user', content: input }],
  });

  const textResult = result.content[0].text;

  try {
    return parser.parse(textResult);
  } catch (err) {
    console.log(err);
  }
};

export const qa = async (
  question: string,
  entries: { content: string; id: string; createdAt: Date }[]
) => {
  const docs = entries.map(
    (entry) =>
      new Document({
        pageContent: `${entry.content}\n\nDate: ${entry.createdAt}`,
        metadata: { id: entry.id, createdAt: entry.createdAt },
      })
  );

  const chain = loadQAStuffChain(chatAnthropic);
  const currentDate = new Date();

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const prompt = `Provide a concise response to the following question, taking into account the dates mentioned in the context and that today is ${month} ${day} ${year}. Responses do not have to start with "Based on the context provided". Here is the question: `;
  const embedding = new VoyageEmbeddings();
  const store = await MemoryVectorStore.fromDocuments(docs, embedding);
  const relevantDocs = await store.similaritySearch(question);
  const res = await chain.invoke({
    input_documents: relevantDocs,
    prompt,
    question,
  });
  console.log(prompt)
  return res.text;
};
