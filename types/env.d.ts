declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      NEXT_PUBLIC_SITE_URL: string;
      NEXT_PUBLIC_GA_ID?: string;
    }
  }

  interface Window {
    AidaForm?: {
      embed: () => void;
      reset: () => void;
    };
    Tracer?: (config: {
      websiteId: string;
      async?: boolean;
      debug?: boolean;
    }) => void;
  }
}
