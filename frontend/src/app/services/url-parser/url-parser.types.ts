export interface ParsedUrl {
  protocol: string;
  slashes: boolean;
  auth: string;
  username: string;
  password: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  query: {
    [key: string]: string;
  };
  hash: string;
  href: string;
  origin: string;
}
