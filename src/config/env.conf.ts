export type EnvConf = {
  APP_PORT: number;
  DATABASE_URL: string;
};

export const envConf: EnvConf = {
  APP_PORT: parseInt(Bun.env.APP_PORT || "3000"),
  DATABASE_URL: Bun.env.DATABASE_URL || "sqlite://db.sqlite",
};
