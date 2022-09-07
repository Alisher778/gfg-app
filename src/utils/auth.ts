import { config } from 'dotenv';
config();

export const getCurrentUser = (token: string) => {
  try {
    const hasValidToken = validateToken(token);
    if (hasValidToken) {
      return {
        username: 'admin123',
        email: 'demo@test.com',
      };
    }
    return null;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

function validateToken(token: string): boolean {
  if (!token || !token.length) {
    return false;
  }
  return process.env.API_KEY === token.split(' ')[1];
}
