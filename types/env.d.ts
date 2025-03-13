declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      NEXT_PUBLIC_SITE_URL: string;
      NEXT_PUBLIC_GA_ID?: string;
    }
  }
}