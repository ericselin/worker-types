declare const caches: CacheStorage;

declare global {
  interface FetchEventListener {
    (event: FetchEvent): void;
  }

  /** Extends the lifetime of the install and activate events dispatched on the global scope as part of the service worker lifecycle. This ensures that any functional events (like FetchEvent) are not dispatched until it upgrades database schemas and deletes the outdated cache entries. */
  interface ExtendableEvent extends Event {
    waitUntil(f: any): void;
  }

  /** This is the event type for fetch events dispatched on the service worker global scope. It contains information about the fetch, including the request and how the receiver will treat the response. It provides the event.respondWith() method, which allows us to provide a response to this fetch. */
  interface FetchEvent extends ExtendableEvent {
    readonly clientId: string;
    readonly preloadResponse: Promise<any>;
    readonly replacesClientId: string;
    readonly request: Request;
    readonly resultingClientId: string;
    respondWith(r: Response | Promise<Response>): void;
  }

  interface FetchEvent extends ExtendableEvent {
    readonly request: Request;
    waitUntil(f: unknown): void;
    respondWith(r: Response | Promise<Response>): void;
  }

  interface ServiceWorkerGlobalScopeEventMap {
    "activate": ExtendableEvent;
    "fetch": FetchEvent;
    "install": ExtendableEvent;
  }

  function addEventListener<
    K extends keyof ServiceWorkerGlobalScopeEventMap,
  >(
    type: K,
    listener: (ev: ServiceWorkerGlobalScopeEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void;

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
