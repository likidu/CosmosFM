type AwaitedInput<T> = PromiseLike<T> | T;

export type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

export type AnyObject = {
  [key: string]: unknown;
};

export type CSSProperties = {
  [key: string]: string | number | null | undefined;
};
