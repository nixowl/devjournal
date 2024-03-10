import Anthropic from '@anthropic-ai/sdk';
import z from 'zod';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { requestAsyncStorage } from 'next/dist/client/components/request-async-storage.external';

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    title: z.string().describe('A descriptive, creative title for the journal entry.'),
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
    const format_instructions = parser.getFormatInstructions()

    const prompt = new PromptTemplate({
      template:
        'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! Do not add any text before or after the JSON response. \n{format_instructions}\n{entry}',
      inputVariables: ['entry'],
      partialVariables: { format_instructions },
    });

    const input = await prompt.format({
        entry: content,
    })

  console.log(input)
  return input
}

const anthropic = new Anthropic();

export const analyze = async (content: any) => {
  const input = await getPrompt(content)
  const result = await anthropic.messages.create({
    model: 'claude-3-opus-20240229',
    max_tokens: 1024,
    messages: [{ role: 'user', content: input }],
  });

  const textResult = result.content[0].text
  
  try {
    return parser.parse(textResult)
  } catch (err) {
    console.log(err)
  }
};
