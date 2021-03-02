/*

Move this file to its own repo!

*/

declare global {
  type FetchEventListener = (event: FetchEvent) => void;

  interface FetchEvent extends Event {
    readonly request: Request;
    waitUntil(f: unknown): void;
    respondWith(r: Response | Promise<Response>): void;
  }

  function addEventListener(
    type: "fetch",
    callback: FetchEventListener,
  ): void;

  const caches: CacheStorage;

  interface CacheQueryOptions {
    ignoreMethod?: boolean;
    ignoreSearch?: boolean;
    ignoreVary?: boolean;
  }

  interface MultiCacheQueryOptions extends CacheQueryOptions {
    cacheName?: string;
  }

  /** Provides a storage mechanism for Request / Response object pairs that are cached, for example as part of the ServiceWorker life cycle. Note that the Cache interface is exposed to windowed scopes as well as workers. You don't have to use it in conjunction with service workers, even though it is defined in the service worker spec. */
  interface Cache {
    add(request: RequestInfo): Promise<void>;
    addAll(requests: RequestInfo[]): Promise<void>;
    delete(request: RequestInfo, options?: CacheQueryOptions): Promise<boolean>;
    keys(
      request?: RequestInfo,
      options?: CacheQueryOptions,
    ): Promise<ReadonlyArray<Request>>;
    match(
      request: RequestInfo,
      options?: CacheQueryOptions,
    ): Promise<Response | undefined>;
    matchAll(
      request?: RequestInfo,
      options?: CacheQueryOptions,
    ): Promise<ReadonlyArray<Response>>;
    put(request: RequestInfo, response: Response): Promise<void>;
  }

  const Cache: {
    prototype: Cache;
    new (): Cache;
  };

  /** The storage for Cache objects. */
  interface CacheStorage {
    delete(cacheName: string): Promise<boolean>;
    has(cacheName: string): Promise<boolean>;
    keys(): Promise<string[]>;
    match(
      request: RequestInfo,
      options?: MultiCacheQueryOptions,
    ): Promise<Response | undefined>;
    open(cacheName: string): Promise<Cache>;
  }

  const CacheStorage: {
    prototype: CacheStorage;
    new (): CacheStorage;
  };
}

export {};
