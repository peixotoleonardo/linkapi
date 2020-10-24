import { registerAs } from '@nestjs/config';

export default registerAs('bling', () => ({
  baseUrl: process.env.BLING_BASE_URL,
  auth: {
    apiKey: process.env.BLING_API_KEY,
  },
}));
