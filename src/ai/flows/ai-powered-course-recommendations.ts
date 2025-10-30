'use server';

/**
 * @fileOverview Provides AI-powered course recommendations based on user interests and goals.
 *
 * - aiPoweredCourseRecommendations - A function that returns personalized course recommendations.
 * - AIPoweredCourseRecommendationsInput - The input type for the aiPoweredCourseRecommendations function.
 * - AIPoweredCourseRecommendationsOutput - The return type for the aiPoweredCourseRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPoweredCourseRecommendationsInputSchema = z.object({
  message: z.string().describe('The user\'s message or query.'),
});
export type AIPoweredCourseRecommendationsInput = z.infer<
  typeof AIPoweredCourseRecommendationsInputSchema
>;

const AIPoweredCourseRecommendationsOutputSchema = z.object({
  courseRecommendations: z
    .string()
    .describe(
      'A helpful, conversational response that provides course recommendations if relevant to the user\'s message.'
    ),
});
export type AIPoweredCourseRecommendationsOutput = z.infer<
  typeof AIPoweredCourseRecommendationsOutputSchema
>;

export async function aiPoweredCourseRecommendations(
  input: AIPoweredCourseRecommendationsInput
): Promise<AIPoweredCourseRecommendationsOutput> {
  return aiPoweredCourseRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPoweredCourseRecommendationsPrompt',
  input: {schema: AIPoweredCourseRecommendationsInputSchema},
  output: {schema: AIPoweredCourseRecommendationsOutputSchema},
  prompt: `You are Aura, an AI assistant for DevAura Labs, a platform for cybersecurity courses and web development services. Be friendly and conversational.

  Your primary goal is to help users by recommending relevant courses from the platform based on their interests and goals.

  If the user's message is about learning, cybersecurity, web development, or related skills, provide a helpful response that includes a list of recommended courses.

  If the user's message is not related to courses or the platform's services, provide a friendly, polite response indicating that you are an assistant for DevAura Labs and can help with questions about their offerings.

  User's message: {{{message}}}
  
  Your response:`,
});

const aiPoweredCourseRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiPoweredCourseRecommendationsFlow',
    inputSchema: AIPoweredCourseRecommendationsInputSchema,
    outputSchema: AIPoweredCourseRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
