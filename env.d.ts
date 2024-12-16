declare namespace NodeJS {
    interface processEnv {
        readonly PORT: number;
        readonly DB: string;
        readonly NODE_ENV: 'development' | 'production';
        readonly BASE_URL: string;
        readonly JWT_KEY: string;
        readonly JWT_EXPIRE: string;

    }
}