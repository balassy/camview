export interface ParsedUrl {
  protocol: string;
  slashes: boolean;
  auth: string;
  username: string;
  password: string;
  host: string;
  hostname: string;
  port: number;
  pathname: string;
  query: {
    [key: string]: string;
  };
  hash: string;
  href: string;
  origin: string;
  set(key: string, value: string): void;
  toString(): string;
}
