import {
  OPENAI_API_HOST,
  OPENAI_API_TYPE,
  OPENAI_API_VERSION,
  OPENAI_ORGANIZATION,
} from '@/utils/app/const';

import { OpenAIModel, OpenAIModelID, OpenAIModels } from '@/types/openai';

export const config = {
  runtime: 'edge',
};

// const handler = async (req: Request): Promise<Response> => {
//   try {
//     const apiKey = process.env.OPENAI_API_KEY;
//     const jwtToken = req.headers.get('Authorization');
//     if (!jwtToken) {
//       return new Response('Unauthorized', { status: 401 });
//     }

//     let url = `${OPENAI_API_HOST}/v1/models`;
//     if (OPENAI_API_TYPE === 'azure') {
//       url = `${OPENAI_API_HOST}/openai/deployments?api-version=${OPENAI_API_VERSION}`;
//     }

//     const response = await fetch(url, {
//       headers: {
//         'Content-Type': 'application/json',
//         ...(OPENAI_API_TYPE === 'openai' && {
//           Authorization: `Bearer ${apiKey}`,
//         }),
//         ...(OPENAI_API_TYPE === 'azure' && {
//           'api-key': apiKey,
//         }),
//         ...(OPENAI_API_TYPE === 'openai' &&
//           OPENAI_ORGANIZATION && {
//             'OpenAI-Organization': OPENAI_ORGANIZATION,
//           }),
//       },
//     });

//     if (!response.ok) {
//       console.error(`OpenAI API error ${response.status}`);
//       throw new Error('An error occurred while processing your request.');
//     }

//     const json = await response.json();

//     const models: OpenAIModel[] = json.data
//       .map((model: any) => {
//         const model_name = OPENAI_API_TYPE === 'azure' ? model.model : model.id;
//         for (const [key, value] of Object.entries(OpenAIModelID)) {
//           if (value === model_name && value === 'gpt-3.5-turbo') {
//             return {
//               id: model.id,
//               name: OpenAIModels[value].name,
//             };
//           }
//         }
//       })
//       .filter(Boolean);
// return new Response(JSON.stringify(models), { status: 200 });
//   } catch (error) {
//     return new Response('Error', { status: 500 });
//   }
// };

const handler = async (req: Request): Promise<Response> => {
  try {
    // Return hard-coded response for development purposes
    const jwtToken = req.headers.get('Authorization');
    if (!jwtToken) {
      return new Response('Unauthorized', { status: 401 });
    }
    const models = [
      {
        id: 'gpt-3.5-turbo',
        name: 'GPT-3.5',
      },
    ];

    return new Response(JSON.stringify(models), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
};

export default handler;
