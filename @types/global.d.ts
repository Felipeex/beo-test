declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      DATABASE_NAME: any;
      DATABASE_USER: any;
      DATABASE_PASSWORD: any;
      DATABASE_HOST: any;
    }
  }
}
export {};
