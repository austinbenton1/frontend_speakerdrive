export interface Metadata {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: {
    title: string;
    description: string;
    url?: string;
    siteName?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
    locale?: string;
    type?: string;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    images?: string | string[];
  };
  icons?: {
    icon?: string | Array<{
      url: string;
      sizes?: string;
      type?: string;
    }>;
    shortcut?: string;
    apple?: Array<{
      url: string;
      sizes?: string;
      type?: string;
    }>;
  };
  manifest?: string;
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
}