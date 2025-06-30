declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      NEXT_PUBLIC_SITE_URL: string;
      NEXT_PUBLIC_GA_ID?: string;
      NEXT_PUBLIC_APP_URL: string;
      NEXT_PUBLIC_MAIN_URL: string;
      NEXT_PUBLIC_BYPASS_TOKEN?: string;
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
    posthog?: {
      init: (apiKey: string, config: any) => void;
      capture: (event: string, properties?: any) => void;
      identify: (userId: string, properties?: any) => void;
      reset: () => void;
      [key: string]: any;
    };
    gtag?: (command: string, ...args: any[]) => void;
    dataLayer?: any[];
    twq?: (command: string, ...args: any[]) => void;
    fbq?: (command: string, ...args: any[]) => void;
    lintrk?: (command: string, data?: any) => void;
    _linkedin_partner_id?: string;
    _linkedin_data_partner_ids?: string[];
  }
}
