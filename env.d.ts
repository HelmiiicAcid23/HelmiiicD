declare namespace NodeJS {
    interface processEnv {
        readonly PORT: number;
        readonly DB: string;
        readonly NODE_ENV: string;
    }
}