export type EnvConf = {
  PORT: number;
  DATABASE_URL: string;
};

export const envConf: EnvConf = {
  PORT: parseInt(Bun.env.PORT || "3000"),
  DATABASE_URL: Bun.env.DATABASE_URL || "sqlite://db.sqlite",
};
