
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model PremarketToken
 * 
 */
export type PremarketToken = $Result.DefaultSelection<Prisma.$PremarketTokenPayload>
/**
 * Model PremarketOffer
 * 
 */
export type PremarketOffer = $Result.DefaultSelection<Prisma.$PremarketOfferPayload>
/**
 * Model PremarketOrder
 * 
 */
export type PremarketOrder = $Result.DefaultSelection<Prisma.$PremarketOrderPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more PremarketTokens
 * const premarketTokens = await prisma.premarketToken.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more PremarketTokens
   * const premarketTokens = await prisma.premarketToken.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.premarketToken`: Exposes CRUD operations for the **PremarketToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PremarketTokens
    * const premarketTokens = await prisma.premarketToken.findMany()
    * ```
    */
  get premarketToken(): Prisma.PremarketTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.premarketOffer`: Exposes CRUD operations for the **PremarketOffer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PremarketOffers
    * const premarketOffers = await prisma.premarketOffer.findMany()
    * ```
    */
  get premarketOffer(): Prisma.PremarketOfferDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.premarketOrder`: Exposes CRUD operations for the **PremarketOrder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PremarketOrders
    * const premarketOrders = await prisma.premarketOrder.findMany()
    * ```
    */
  get premarketOrder(): Prisma.PremarketOrderDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.14.0
   * Query Engine version: 717184b7b35ea05dfa71a3236b7af656013e1e49
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    PremarketToken: 'PremarketToken',
    PremarketOffer: 'PremarketOffer',
    PremarketOrder: 'PremarketOrder'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "premarketToken" | "premarketOffer" | "premarketOrder"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      PremarketToken: {
        payload: Prisma.$PremarketTokenPayload<ExtArgs>
        fields: Prisma.PremarketTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PremarketTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PremarketTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketTokenPayload>
          }
          findFirst: {
            args: Prisma.PremarketTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PremarketTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketTokenPayload>
          }
          findMany: {
            args: Prisma.PremarketTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketTokenPayload>[]
          }
          create: {
            args: Prisma.PremarketTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketTokenPayload>
          }
          createMany: {
            args: Prisma.PremarketTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PremarketTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketTokenPayload>[]
          }
          delete: {
            args: Prisma.PremarketTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketTokenPayload>
          }
          update: {
            args: Prisma.PremarketTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketTokenPayload>
          }
          deleteMany: {
            args: Prisma.PremarketTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PremarketTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PremarketTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketTokenPayload>[]
          }
          upsert: {
            args: Prisma.PremarketTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketTokenPayload>
          }
          aggregate: {
            args: Prisma.PremarketTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePremarketToken>
          }
          groupBy: {
            args: Prisma.PremarketTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<PremarketTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.PremarketTokenCountArgs<ExtArgs>
            result: $Utils.Optional<PremarketTokenCountAggregateOutputType> | number
          }
        }
      }
      PremarketOffer: {
        payload: Prisma.$PremarketOfferPayload<ExtArgs>
        fields: Prisma.PremarketOfferFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PremarketOfferFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketOfferPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PremarketOfferFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketOfferPayload>
          }
          findFirst: {
            args: Prisma.PremarketOfferFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketOfferPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PremarketOfferFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketOfferPayload>
          }
          findMany: {
            args: Prisma.PremarketOfferFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketOfferPayload>[]
          }
          create: {
            args: Prisma.PremarketOfferCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketOfferPayload>
          }
          createMany: {
            args: Prisma.PremarketOfferCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PremarketOfferCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketOfferPayload>[]
          }
          delete: {
            args: Prisma.PremarketOfferDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketOfferPayload>
          }
          update: {
            args: Prisma.PremarketOfferUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketOfferPayload>
          }
          deleteMany: {
            args: Prisma.PremarketOfferDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PremarketOfferUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PremarketOfferUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketOfferPayload>[]
          }
          upsert: {
            args: Prisma.PremarketOfferUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketOfferPayload>
          }
          aggregate: {
            args: Prisma.PremarketOfferAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePremarketOffer>
          }
          groupBy: {
            args: Prisma.PremarketOfferGroupByArgs<ExtArgs>
            result: $Utils.Optional<PremarketOfferGroupByOutputType>[]
          }
          count: {
            args: Prisma.PremarketOfferCountArgs<ExtArgs>
            result: $Utils.Optional<PremarketOfferCountAggregateOutputType> | number
          }
        }
      }
      PremarketOrder: {
        payload: Prisma.$PremarketOrderPayload<ExtArgs>
        fields: Prisma.PremarketOrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PremarketOrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketOrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PremarketOrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketOrderPayload>
          }
          findFirst: {
            args: Prisma.PremarketOrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketOrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PremarketOrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketOrderPayload>
          }
          findMany: {
            args: Prisma.PremarketOrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketOrderPayload>[]
          }
          create: {
            args: Prisma.PremarketOrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketOrderPayload>
          }
          createMany: {
            args: Prisma.PremarketOrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PremarketOrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketOrderPayload>[]
          }
          delete: {
            args: Prisma.PremarketOrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketOrderPayload>
          }
          update: {
            args: Prisma.PremarketOrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketOrderPayload>
          }
          deleteMany: {
            args: Prisma.PremarketOrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PremarketOrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PremarketOrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketOrderPayload>[]
          }
          upsert: {
            args: Prisma.PremarketOrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremarketOrderPayload>
          }
          aggregate: {
            args: Prisma.PremarketOrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePremarketOrder>
          }
          groupBy: {
            args: Prisma.PremarketOrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<PremarketOrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.PremarketOrderCountArgs<ExtArgs>
            result: $Utils.Optional<PremarketOrderCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    premarketToken?: PremarketTokenOmit
    premarketOffer?: PremarketOfferOmit
    premarketOrder?: PremarketOrderOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PremarketTokenCountOutputType
   */

  export type PremarketTokenCountOutputType = {
    offers: number
    orders: number
  }

  export type PremarketTokenCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    offers?: boolean | PremarketTokenCountOutputTypeCountOffersArgs
    orders?: boolean | PremarketTokenCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * PremarketTokenCountOutputType without action
   */
  export type PremarketTokenCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketTokenCountOutputType
     */
    select?: PremarketTokenCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PremarketTokenCountOutputType without action
   */
  export type PremarketTokenCountOutputTypeCountOffersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PremarketOfferWhereInput
  }

  /**
   * PremarketTokenCountOutputType without action
   */
  export type PremarketTokenCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PremarketOrderWhereInput
  }


  /**
   * Count Type PremarketOfferCountOutputType
   */

  export type PremarketOfferCountOutputType = {
    orders: number
  }

  export type PremarketOfferCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | PremarketOfferCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * PremarketOfferCountOutputType without action
   */
  export type PremarketOfferCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketOfferCountOutputType
     */
    select?: PremarketOfferCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PremarketOfferCountOutputType without action
   */
  export type PremarketOfferCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PremarketOrderWhereInput
  }


  /**
   * Models
   */

  /**
   * Model PremarketToken
   */

  export type AggregatePremarketToken = {
    _count: PremarketTokenCountAggregateOutputType | null
    _avg: PremarketTokenAvgAggregateOutputType | null
    _sum: PremarketTokenSumAggregateOutputType | null
    _min: PremarketTokenMinAggregateOutputType | null
    _max: PremarketTokenMaxAggregateOutputType | null
  }

  export type PremarketTokenAvgAggregateOutputType = {
    settle_duration: number | null
    settle_started_at: number | null
    status: number | null
  }

  export type PremarketTokenSumAggregateOutputType = {
    settle_duration: bigint | null
    settle_started_at: bigint | null
    status: number | null
  }

  export type PremarketTokenMinAggregateOutputType = {
    token_addr: string | null
    name: string | null
    symbol: string | null
    website: string | null
    twitter: string | null
    telegram: string | null
    settle_duration: bigint | null
    temp_starts_at: Date | null
    temp_ends_at: Date | null
    settle_started_at: bigint | null
    status: number | null
    fa: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PremarketTokenMaxAggregateOutputType = {
    token_addr: string | null
    name: string | null
    symbol: string | null
    website: string | null
    twitter: string | null
    telegram: string | null
    settle_duration: bigint | null
    temp_starts_at: Date | null
    temp_ends_at: Date | null
    settle_started_at: bigint | null
    status: number | null
    fa: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PremarketTokenCountAggregateOutputType = {
    token_addr: number
    name: number
    symbol: number
    website: number
    twitter: number
    telegram: number
    settle_duration: number
    temp_starts_at: number
    temp_ends_at: number
    settle_started_at: number
    status: number
    fa: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PremarketTokenAvgAggregateInputType = {
    settle_duration?: true
    settle_started_at?: true
    status?: true
  }

  export type PremarketTokenSumAggregateInputType = {
    settle_duration?: true
    settle_started_at?: true
    status?: true
  }

  export type PremarketTokenMinAggregateInputType = {
    token_addr?: true
    name?: true
    symbol?: true
    website?: true
    twitter?: true
    telegram?: true
    settle_duration?: true
    temp_starts_at?: true
    temp_ends_at?: true
    settle_started_at?: true
    status?: true
    fa?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PremarketTokenMaxAggregateInputType = {
    token_addr?: true
    name?: true
    symbol?: true
    website?: true
    twitter?: true
    telegram?: true
    settle_duration?: true
    temp_starts_at?: true
    temp_ends_at?: true
    settle_started_at?: true
    status?: true
    fa?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PremarketTokenCountAggregateInputType = {
    token_addr?: true
    name?: true
    symbol?: true
    website?: true
    twitter?: true
    telegram?: true
    settle_duration?: true
    temp_starts_at?: true
    temp_ends_at?: true
    settle_started_at?: true
    status?: true
    fa?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PremarketTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PremarketToken to aggregate.
     */
    where?: PremarketTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PremarketTokens to fetch.
     */
    orderBy?: PremarketTokenOrderByWithRelationInput | PremarketTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PremarketTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PremarketTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PremarketTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PremarketTokens
    **/
    _count?: true | PremarketTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PremarketTokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PremarketTokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PremarketTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PremarketTokenMaxAggregateInputType
  }

  export type GetPremarketTokenAggregateType<T extends PremarketTokenAggregateArgs> = {
        [P in keyof T & keyof AggregatePremarketToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePremarketToken[P]>
      : GetScalarType<T[P], AggregatePremarketToken[P]>
  }




  export type PremarketTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PremarketTokenWhereInput
    orderBy?: PremarketTokenOrderByWithAggregationInput | PremarketTokenOrderByWithAggregationInput[]
    by: PremarketTokenScalarFieldEnum[] | PremarketTokenScalarFieldEnum
    having?: PremarketTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PremarketTokenCountAggregateInputType | true
    _avg?: PremarketTokenAvgAggregateInputType
    _sum?: PremarketTokenSumAggregateInputType
    _min?: PremarketTokenMinAggregateInputType
    _max?: PremarketTokenMaxAggregateInputType
  }

  export type PremarketTokenGroupByOutputType = {
    token_addr: string
    name: string
    symbol: string
    website: string | null
    twitter: string | null
    telegram: string | null
    settle_duration: bigint
    temp_starts_at: Date | null
    temp_ends_at: Date | null
    settle_started_at: bigint | null
    status: number
    fa: string | null
    createdAt: Date
    updatedAt: Date
    _count: PremarketTokenCountAggregateOutputType | null
    _avg: PremarketTokenAvgAggregateOutputType | null
    _sum: PremarketTokenSumAggregateOutputType | null
    _min: PremarketTokenMinAggregateOutputType | null
    _max: PremarketTokenMaxAggregateOutputType | null
  }

  type GetPremarketTokenGroupByPayload<T extends PremarketTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PremarketTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PremarketTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PremarketTokenGroupByOutputType[P]>
            : GetScalarType<T[P], PremarketTokenGroupByOutputType[P]>
        }
      >
    >


  export type PremarketTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    token_addr?: boolean
    name?: boolean
    symbol?: boolean
    website?: boolean
    twitter?: boolean
    telegram?: boolean
    settle_duration?: boolean
    temp_starts_at?: boolean
    temp_ends_at?: boolean
    settle_started_at?: boolean
    status?: boolean
    fa?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    offers?: boolean | PremarketToken$offersArgs<ExtArgs>
    orders?: boolean | PremarketToken$ordersArgs<ExtArgs>
    _count?: boolean | PremarketTokenCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["premarketToken"]>

  export type PremarketTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    token_addr?: boolean
    name?: boolean
    symbol?: boolean
    website?: boolean
    twitter?: boolean
    telegram?: boolean
    settle_duration?: boolean
    temp_starts_at?: boolean
    temp_ends_at?: boolean
    settle_started_at?: boolean
    status?: boolean
    fa?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["premarketToken"]>

  export type PremarketTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    token_addr?: boolean
    name?: boolean
    symbol?: boolean
    website?: boolean
    twitter?: boolean
    telegram?: boolean
    settle_duration?: boolean
    temp_starts_at?: boolean
    temp_ends_at?: boolean
    settle_started_at?: boolean
    status?: boolean
    fa?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["premarketToken"]>

  export type PremarketTokenSelectScalar = {
    token_addr?: boolean
    name?: boolean
    symbol?: boolean
    website?: boolean
    twitter?: boolean
    telegram?: boolean
    settle_duration?: boolean
    temp_starts_at?: boolean
    temp_ends_at?: boolean
    settle_started_at?: boolean
    status?: boolean
    fa?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PremarketTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"token_addr" | "name" | "symbol" | "website" | "twitter" | "telegram" | "settle_duration" | "temp_starts_at" | "temp_ends_at" | "settle_started_at" | "status" | "fa" | "createdAt" | "updatedAt", ExtArgs["result"]["premarketToken"]>
  export type PremarketTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    offers?: boolean | PremarketToken$offersArgs<ExtArgs>
    orders?: boolean | PremarketToken$ordersArgs<ExtArgs>
    _count?: boolean | PremarketTokenCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PremarketTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PremarketTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PremarketTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PremarketToken"
    objects: {
      offers: Prisma.$PremarketOfferPayload<ExtArgs>[]
      orders: Prisma.$PremarketOrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      token_addr: string
      name: string
      symbol: string
      website: string | null
      twitter: string | null
      telegram: string | null
      settle_duration: bigint
      temp_starts_at: Date | null
      temp_ends_at: Date | null
      settle_started_at: bigint | null
      status: number
      fa: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["premarketToken"]>
    composites: {}
  }

  type PremarketTokenGetPayload<S extends boolean | null | undefined | PremarketTokenDefaultArgs> = $Result.GetResult<Prisma.$PremarketTokenPayload, S>

  type PremarketTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PremarketTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PremarketTokenCountAggregateInputType | true
    }

  export interface PremarketTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PremarketToken'], meta: { name: 'PremarketToken' } }
    /**
     * Find zero or one PremarketToken that matches the filter.
     * @param {PremarketTokenFindUniqueArgs} args - Arguments to find a PremarketToken
     * @example
     * // Get one PremarketToken
     * const premarketToken = await prisma.premarketToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PremarketTokenFindUniqueArgs>(args: SelectSubset<T, PremarketTokenFindUniqueArgs<ExtArgs>>): Prisma__PremarketTokenClient<$Result.GetResult<Prisma.$PremarketTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PremarketToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PremarketTokenFindUniqueOrThrowArgs} args - Arguments to find a PremarketToken
     * @example
     * // Get one PremarketToken
     * const premarketToken = await prisma.premarketToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PremarketTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, PremarketTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PremarketTokenClient<$Result.GetResult<Prisma.$PremarketTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PremarketToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremarketTokenFindFirstArgs} args - Arguments to find a PremarketToken
     * @example
     * // Get one PremarketToken
     * const premarketToken = await prisma.premarketToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PremarketTokenFindFirstArgs>(args?: SelectSubset<T, PremarketTokenFindFirstArgs<ExtArgs>>): Prisma__PremarketTokenClient<$Result.GetResult<Prisma.$PremarketTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PremarketToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremarketTokenFindFirstOrThrowArgs} args - Arguments to find a PremarketToken
     * @example
     * // Get one PremarketToken
     * const premarketToken = await prisma.premarketToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PremarketTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, PremarketTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__PremarketTokenClient<$Result.GetResult<Prisma.$PremarketTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PremarketTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremarketTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PremarketTokens
     * const premarketTokens = await prisma.premarketToken.findMany()
     * 
     * // Get first 10 PremarketTokens
     * const premarketTokens = await prisma.premarketToken.findMany({ take: 10 })
     * 
     * // Only select the `token_addr`
     * const premarketTokenWithToken_addrOnly = await prisma.premarketToken.findMany({ select: { token_addr: true } })
     * 
     */
    findMany<T extends PremarketTokenFindManyArgs>(args?: SelectSubset<T, PremarketTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PremarketTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PremarketToken.
     * @param {PremarketTokenCreateArgs} args - Arguments to create a PremarketToken.
     * @example
     * // Create one PremarketToken
     * const PremarketToken = await prisma.premarketToken.create({
     *   data: {
     *     // ... data to create a PremarketToken
     *   }
     * })
     * 
     */
    create<T extends PremarketTokenCreateArgs>(args: SelectSubset<T, PremarketTokenCreateArgs<ExtArgs>>): Prisma__PremarketTokenClient<$Result.GetResult<Prisma.$PremarketTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PremarketTokens.
     * @param {PremarketTokenCreateManyArgs} args - Arguments to create many PremarketTokens.
     * @example
     * // Create many PremarketTokens
     * const premarketToken = await prisma.premarketToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PremarketTokenCreateManyArgs>(args?: SelectSubset<T, PremarketTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PremarketTokens and returns the data saved in the database.
     * @param {PremarketTokenCreateManyAndReturnArgs} args - Arguments to create many PremarketTokens.
     * @example
     * // Create many PremarketTokens
     * const premarketToken = await prisma.premarketToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PremarketTokens and only return the `token_addr`
     * const premarketTokenWithToken_addrOnly = await prisma.premarketToken.createManyAndReturn({
     *   select: { token_addr: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PremarketTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, PremarketTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PremarketTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PremarketToken.
     * @param {PremarketTokenDeleteArgs} args - Arguments to delete one PremarketToken.
     * @example
     * // Delete one PremarketToken
     * const PremarketToken = await prisma.premarketToken.delete({
     *   where: {
     *     // ... filter to delete one PremarketToken
     *   }
     * })
     * 
     */
    delete<T extends PremarketTokenDeleteArgs>(args: SelectSubset<T, PremarketTokenDeleteArgs<ExtArgs>>): Prisma__PremarketTokenClient<$Result.GetResult<Prisma.$PremarketTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PremarketToken.
     * @param {PremarketTokenUpdateArgs} args - Arguments to update one PremarketToken.
     * @example
     * // Update one PremarketToken
     * const premarketToken = await prisma.premarketToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PremarketTokenUpdateArgs>(args: SelectSubset<T, PremarketTokenUpdateArgs<ExtArgs>>): Prisma__PremarketTokenClient<$Result.GetResult<Prisma.$PremarketTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PremarketTokens.
     * @param {PremarketTokenDeleteManyArgs} args - Arguments to filter PremarketTokens to delete.
     * @example
     * // Delete a few PremarketTokens
     * const { count } = await prisma.premarketToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PremarketTokenDeleteManyArgs>(args?: SelectSubset<T, PremarketTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PremarketTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremarketTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PremarketTokens
     * const premarketToken = await prisma.premarketToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PremarketTokenUpdateManyArgs>(args: SelectSubset<T, PremarketTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PremarketTokens and returns the data updated in the database.
     * @param {PremarketTokenUpdateManyAndReturnArgs} args - Arguments to update many PremarketTokens.
     * @example
     * // Update many PremarketTokens
     * const premarketToken = await prisma.premarketToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PremarketTokens and only return the `token_addr`
     * const premarketTokenWithToken_addrOnly = await prisma.premarketToken.updateManyAndReturn({
     *   select: { token_addr: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PremarketTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, PremarketTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PremarketTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PremarketToken.
     * @param {PremarketTokenUpsertArgs} args - Arguments to update or create a PremarketToken.
     * @example
     * // Update or create a PremarketToken
     * const premarketToken = await prisma.premarketToken.upsert({
     *   create: {
     *     // ... data to create a PremarketToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PremarketToken we want to update
     *   }
     * })
     */
    upsert<T extends PremarketTokenUpsertArgs>(args: SelectSubset<T, PremarketTokenUpsertArgs<ExtArgs>>): Prisma__PremarketTokenClient<$Result.GetResult<Prisma.$PremarketTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PremarketTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremarketTokenCountArgs} args - Arguments to filter PremarketTokens to count.
     * @example
     * // Count the number of PremarketTokens
     * const count = await prisma.premarketToken.count({
     *   where: {
     *     // ... the filter for the PremarketTokens we want to count
     *   }
     * })
    **/
    count<T extends PremarketTokenCountArgs>(
      args?: Subset<T, PremarketTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PremarketTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PremarketToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremarketTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PremarketTokenAggregateArgs>(args: Subset<T, PremarketTokenAggregateArgs>): Prisma.PrismaPromise<GetPremarketTokenAggregateType<T>>

    /**
     * Group by PremarketToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremarketTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PremarketTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PremarketTokenGroupByArgs['orderBy'] }
        : { orderBy?: PremarketTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PremarketTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPremarketTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PremarketToken model
   */
  readonly fields: PremarketTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PremarketToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PremarketTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    offers<T extends PremarketToken$offersArgs<ExtArgs> = {}>(args?: Subset<T, PremarketToken$offersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PremarketOfferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orders<T extends PremarketToken$ordersArgs<ExtArgs> = {}>(args?: Subset<T, PremarketToken$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PremarketOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PremarketToken model
   */
  interface PremarketTokenFieldRefs {
    readonly token_addr: FieldRef<"PremarketToken", 'String'>
    readonly name: FieldRef<"PremarketToken", 'String'>
    readonly symbol: FieldRef<"PremarketToken", 'String'>
    readonly website: FieldRef<"PremarketToken", 'String'>
    readonly twitter: FieldRef<"PremarketToken", 'String'>
    readonly telegram: FieldRef<"PremarketToken", 'String'>
    readonly settle_duration: FieldRef<"PremarketToken", 'BigInt'>
    readonly temp_starts_at: FieldRef<"PremarketToken", 'DateTime'>
    readonly temp_ends_at: FieldRef<"PremarketToken", 'DateTime'>
    readonly settle_started_at: FieldRef<"PremarketToken", 'BigInt'>
    readonly status: FieldRef<"PremarketToken", 'Int'>
    readonly fa: FieldRef<"PremarketToken", 'String'>
    readonly createdAt: FieldRef<"PremarketToken", 'DateTime'>
    readonly updatedAt: FieldRef<"PremarketToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PremarketToken findUnique
   */
  export type PremarketTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketToken
     */
    select?: PremarketTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketToken
     */
    omit?: PremarketTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketTokenInclude<ExtArgs> | null
    /**
     * Filter, which PremarketToken to fetch.
     */
    where: PremarketTokenWhereUniqueInput
  }

  /**
   * PremarketToken findUniqueOrThrow
   */
  export type PremarketTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketToken
     */
    select?: PremarketTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketToken
     */
    omit?: PremarketTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketTokenInclude<ExtArgs> | null
    /**
     * Filter, which PremarketToken to fetch.
     */
    where: PremarketTokenWhereUniqueInput
  }

  /**
   * PremarketToken findFirst
   */
  export type PremarketTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketToken
     */
    select?: PremarketTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketToken
     */
    omit?: PremarketTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketTokenInclude<ExtArgs> | null
    /**
     * Filter, which PremarketToken to fetch.
     */
    where?: PremarketTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PremarketTokens to fetch.
     */
    orderBy?: PremarketTokenOrderByWithRelationInput | PremarketTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PremarketTokens.
     */
    cursor?: PremarketTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PremarketTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PremarketTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PremarketTokens.
     */
    distinct?: PremarketTokenScalarFieldEnum | PremarketTokenScalarFieldEnum[]
  }

  /**
   * PremarketToken findFirstOrThrow
   */
  export type PremarketTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketToken
     */
    select?: PremarketTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketToken
     */
    omit?: PremarketTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketTokenInclude<ExtArgs> | null
    /**
     * Filter, which PremarketToken to fetch.
     */
    where?: PremarketTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PremarketTokens to fetch.
     */
    orderBy?: PremarketTokenOrderByWithRelationInput | PremarketTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PremarketTokens.
     */
    cursor?: PremarketTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PremarketTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PremarketTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PremarketTokens.
     */
    distinct?: PremarketTokenScalarFieldEnum | PremarketTokenScalarFieldEnum[]
  }

  /**
   * PremarketToken findMany
   */
  export type PremarketTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketToken
     */
    select?: PremarketTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketToken
     */
    omit?: PremarketTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketTokenInclude<ExtArgs> | null
    /**
     * Filter, which PremarketTokens to fetch.
     */
    where?: PremarketTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PremarketTokens to fetch.
     */
    orderBy?: PremarketTokenOrderByWithRelationInput | PremarketTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PremarketTokens.
     */
    cursor?: PremarketTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PremarketTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PremarketTokens.
     */
    skip?: number
    distinct?: PremarketTokenScalarFieldEnum | PremarketTokenScalarFieldEnum[]
  }

  /**
   * PremarketToken create
   */
  export type PremarketTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketToken
     */
    select?: PremarketTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketToken
     */
    omit?: PremarketTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a PremarketToken.
     */
    data: XOR<PremarketTokenCreateInput, PremarketTokenUncheckedCreateInput>
  }

  /**
   * PremarketToken createMany
   */
  export type PremarketTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PremarketTokens.
     */
    data: PremarketTokenCreateManyInput | PremarketTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PremarketToken createManyAndReturn
   */
  export type PremarketTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketToken
     */
    select?: PremarketTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketToken
     */
    omit?: PremarketTokenOmit<ExtArgs> | null
    /**
     * The data used to create many PremarketTokens.
     */
    data: PremarketTokenCreateManyInput | PremarketTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PremarketToken update
   */
  export type PremarketTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketToken
     */
    select?: PremarketTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketToken
     */
    omit?: PremarketTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a PremarketToken.
     */
    data: XOR<PremarketTokenUpdateInput, PremarketTokenUncheckedUpdateInput>
    /**
     * Choose, which PremarketToken to update.
     */
    where: PremarketTokenWhereUniqueInput
  }

  /**
   * PremarketToken updateMany
   */
  export type PremarketTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PremarketTokens.
     */
    data: XOR<PremarketTokenUpdateManyMutationInput, PremarketTokenUncheckedUpdateManyInput>
    /**
     * Filter which PremarketTokens to update
     */
    where?: PremarketTokenWhereInput
    /**
     * Limit how many PremarketTokens to update.
     */
    limit?: number
  }

  /**
   * PremarketToken updateManyAndReturn
   */
  export type PremarketTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketToken
     */
    select?: PremarketTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketToken
     */
    omit?: PremarketTokenOmit<ExtArgs> | null
    /**
     * The data used to update PremarketTokens.
     */
    data: XOR<PremarketTokenUpdateManyMutationInput, PremarketTokenUncheckedUpdateManyInput>
    /**
     * Filter which PremarketTokens to update
     */
    where?: PremarketTokenWhereInput
    /**
     * Limit how many PremarketTokens to update.
     */
    limit?: number
  }

  /**
   * PremarketToken upsert
   */
  export type PremarketTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketToken
     */
    select?: PremarketTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketToken
     */
    omit?: PremarketTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the PremarketToken to update in case it exists.
     */
    where: PremarketTokenWhereUniqueInput
    /**
     * In case the PremarketToken found by the `where` argument doesn't exist, create a new PremarketToken with this data.
     */
    create: XOR<PremarketTokenCreateInput, PremarketTokenUncheckedCreateInput>
    /**
     * In case the PremarketToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PremarketTokenUpdateInput, PremarketTokenUncheckedUpdateInput>
  }

  /**
   * PremarketToken delete
   */
  export type PremarketTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketToken
     */
    select?: PremarketTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketToken
     */
    omit?: PremarketTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketTokenInclude<ExtArgs> | null
    /**
     * Filter which PremarketToken to delete.
     */
    where: PremarketTokenWhereUniqueInput
  }

  /**
   * PremarketToken deleteMany
   */
  export type PremarketTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PremarketTokens to delete
     */
    where?: PremarketTokenWhereInput
    /**
     * Limit how many PremarketTokens to delete.
     */
    limit?: number
  }

  /**
   * PremarketToken.offers
   */
  export type PremarketToken$offersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketOffer
     */
    select?: PremarketOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketOffer
     */
    omit?: PremarketOfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketOfferInclude<ExtArgs> | null
    where?: PremarketOfferWhereInput
    orderBy?: PremarketOfferOrderByWithRelationInput | PremarketOfferOrderByWithRelationInput[]
    cursor?: PremarketOfferWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PremarketOfferScalarFieldEnum | PremarketOfferScalarFieldEnum[]
  }

  /**
   * PremarketToken.orders
   */
  export type PremarketToken$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketOrder
     */
    select?: PremarketOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketOrder
     */
    omit?: PremarketOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketOrderInclude<ExtArgs> | null
    where?: PremarketOrderWhereInput
    orderBy?: PremarketOrderOrderByWithRelationInput | PremarketOrderOrderByWithRelationInput[]
    cursor?: PremarketOrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PremarketOrderScalarFieldEnum | PremarketOrderScalarFieldEnum[]
  }

  /**
   * PremarketToken without action
   */
  export type PremarketTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketToken
     */
    select?: PremarketTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketToken
     */
    omit?: PremarketTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketTokenInclude<ExtArgs> | null
  }


  /**
   * Model PremarketOffer
   */

  export type AggregatePremarketOffer = {
    _count: PremarketOfferCountAggregateOutputType | null
    _avg: PremarketOfferAvgAggregateOutputType | null
    _sum: PremarketOfferSumAggregateOutputType | null
    _min: PremarketOfferMinAggregateOutputType | null
    _max: PremarketOfferMaxAggregateOutputType | null
  }

  export type PremarketOfferAvgAggregateOutputType = {
    price: number | null
    amount: number | null
    ts: number | null
    filled_amount: number | null
  }

  export type PremarketOfferSumAggregateOutputType = {
    price: bigint | null
    amount: bigint | null
    ts: bigint | null
    filled_amount: bigint | null
  }

  export type PremarketOfferMinAggregateOutputType = {
    offer_addr: string | null
    token_addr: string | null
    price: bigint | null
    amount: bigint | null
    is_buy: boolean | null
    is_full_match: boolean | null
    created_by: string | null
    ts: bigint | null
    filled_amount: bigint | null
    is_active: boolean | null
  }

  export type PremarketOfferMaxAggregateOutputType = {
    offer_addr: string | null
    token_addr: string | null
    price: bigint | null
    amount: bigint | null
    is_buy: boolean | null
    is_full_match: boolean | null
    created_by: string | null
    ts: bigint | null
    filled_amount: bigint | null
    is_active: boolean | null
  }

  export type PremarketOfferCountAggregateOutputType = {
    offer_addr: number
    token_addr: number
    price: number
    amount: number
    is_buy: number
    is_full_match: number
    created_by: number
    ts: number
    filled_amount: number
    is_active: number
    _all: number
  }


  export type PremarketOfferAvgAggregateInputType = {
    price?: true
    amount?: true
    ts?: true
    filled_amount?: true
  }

  export type PremarketOfferSumAggregateInputType = {
    price?: true
    amount?: true
    ts?: true
    filled_amount?: true
  }

  export type PremarketOfferMinAggregateInputType = {
    offer_addr?: true
    token_addr?: true
    price?: true
    amount?: true
    is_buy?: true
    is_full_match?: true
    created_by?: true
    ts?: true
    filled_amount?: true
    is_active?: true
  }

  export type PremarketOfferMaxAggregateInputType = {
    offer_addr?: true
    token_addr?: true
    price?: true
    amount?: true
    is_buy?: true
    is_full_match?: true
    created_by?: true
    ts?: true
    filled_amount?: true
    is_active?: true
  }

  export type PremarketOfferCountAggregateInputType = {
    offer_addr?: true
    token_addr?: true
    price?: true
    amount?: true
    is_buy?: true
    is_full_match?: true
    created_by?: true
    ts?: true
    filled_amount?: true
    is_active?: true
    _all?: true
  }

  export type PremarketOfferAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PremarketOffer to aggregate.
     */
    where?: PremarketOfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PremarketOffers to fetch.
     */
    orderBy?: PremarketOfferOrderByWithRelationInput | PremarketOfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PremarketOfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PremarketOffers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PremarketOffers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PremarketOffers
    **/
    _count?: true | PremarketOfferCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PremarketOfferAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PremarketOfferSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PremarketOfferMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PremarketOfferMaxAggregateInputType
  }

  export type GetPremarketOfferAggregateType<T extends PremarketOfferAggregateArgs> = {
        [P in keyof T & keyof AggregatePremarketOffer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePremarketOffer[P]>
      : GetScalarType<T[P], AggregatePremarketOffer[P]>
  }




  export type PremarketOfferGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PremarketOfferWhereInput
    orderBy?: PremarketOfferOrderByWithAggregationInput | PremarketOfferOrderByWithAggregationInput[]
    by: PremarketOfferScalarFieldEnum[] | PremarketOfferScalarFieldEnum
    having?: PremarketOfferScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PremarketOfferCountAggregateInputType | true
    _avg?: PremarketOfferAvgAggregateInputType
    _sum?: PremarketOfferSumAggregateInputType
    _min?: PremarketOfferMinAggregateInputType
    _max?: PremarketOfferMaxAggregateInputType
  }

  export type PremarketOfferGroupByOutputType = {
    offer_addr: string
    token_addr: string
    price: bigint
    amount: bigint
    is_buy: boolean
    is_full_match: boolean
    created_by: string
    ts: bigint
    filled_amount: bigint
    is_active: boolean
    _count: PremarketOfferCountAggregateOutputType | null
    _avg: PremarketOfferAvgAggregateOutputType | null
    _sum: PremarketOfferSumAggregateOutputType | null
    _min: PremarketOfferMinAggregateOutputType | null
    _max: PremarketOfferMaxAggregateOutputType | null
  }

  type GetPremarketOfferGroupByPayload<T extends PremarketOfferGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PremarketOfferGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PremarketOfferGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PremarketOfferGroupByOutputType[P]>
            : GetScalarType<T[P], PremarketOfferGroupByOutputType[P]>
        }
      >
    >


  export type PremarketOfferSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    offer_addr?: boolean
    token_addr?: boolean
    price?: boolean
    amount?: boolean
    is_buy?: boolean
    is_full_match?: boolean
    created_by?: boolean
    ts?: boolean
    filled_amount?: boolean
    is_active?: boolean
    token?: boolean | PremarketTokenDefaultArgs<ExtArgs>
    orders?: boolean | PremarketOffer$ordersArgs<ExtArgs>
    _count?: boolean | PremarketOfferCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["premarketOffer"]>

  export type PremarketOfferSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    offer_addr?: boolean
    token_addr?: boolean
    price?: boolean
    amount?: boolean
    is_buy?: boolean
    is_full_match?: boolean
    created_by?: boolean
    ts?: boolean
    filled_amount?: boolean
    is_active?: boolean
    token?: boolean | PremarketTokenDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["premarketOffer"]>

  export type PremarketOfferSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    offer_addr?: boolean
    token_addr?: boolean
    price?: boolean
    amount?: boolean
    is_buy?: boolean
    is_full_match?: boolean
    created_by?: boolean
    ts?: boolean
    filled_amount?: boolean
    is_active?: boolean
    token?: boolean | PremarketTokenDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["premarketOffer"]>

  export type PremarketOfferSelectScalar = {
    offer_addr?: boolean
    token_addr?: boolean
    price?: boolean
    amount?: boolean
    is_buy?: boolean
    is_full_match?: boolean
    created_by?: boolean
    ts?: boolean
    filled_amount?: boolean
    is_active?: boolean
  }

  export type PremarketOfferOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"offer_addr" | "token_addr" | "price" | "amount" | "is_buy" | "is_full_match" | "created_by" | "ts" | "filled_amount" | "is_active", ExtArgs["result"]["premarketOffer"]>
  export type PremarketOfferInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    token?: boolean | PremarketTokenDefaultArgs<ExtArgs>
    orders?: boolean | PremarketOffer$ordersArgs<ExtArgs>
    _count?: boolean | PremarketOfferCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PremarketOfferIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    token?: boolean | PremarketTokenDefaultArgs<ExtArgs>
  }
  export type PremarketOfferIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    token?: boolean | PremarketTokenDefaultArgs<ExtArgs>
  }

  export type $PremarketOfferPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PremarketOffer"
    objects: {
      token: Prisma.$PremarketTokenPayload<ExtArgs>
      orders: Prisma.$PremarketOrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      offer_addr: string
      token_addr: string
      price: bigint
      amount: bigint
      is_buy: boolean
      is_full_match: boolean
      created_by: string
      ts: bigint
      filled_amount: bigint
      is_active: boolean
    }, ExtArgs["result"]["premarketOffer"]>
    composites: {}
  }

  type PremarketOfferGetPayload<S extends boolean | null | undefined | PremarketOfferDefaultArgs> = $Result.GetResult<Prisma.$PremarketOfferPayload, S>

  type PremarketOfferCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PremarketOfferFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PremarketOfferCountAggregateInputType | true
    }

  export interface PremarketOfferDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PremarketOffer'], meta: { name: 'PremarketOffer' } }
    /**
     * Find zero or one PremarketOffer that matches the filter.
     * @param {PremarketOfferFindUniqueArgs} args - Arguments to find a PremarketOffer
     * @example
     * // Get one PremarketOffer
     * const premarketOffer = await prisma.premarketOffer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PremarketOfferFindUniqueArgs>(args: SelectSubset<T, PremarketOfferFindUniqueArgs<ExtArgs>>): Prisma__PremarketOfferClient<$Result.GetResult<Prisma.$PremarketOfferPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PremarketOffer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PremarketOfferFindUniqueOrThrowArgs} args - Arguments to find a PremarketOffer
     * @example
     * // Get one PremarketOffer
     * const premarketOffer = await prisma.premarketOffer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PremarketOfferFindUniqueOrThrowArgs>(args: SelectSubset<T, PremarketOfferFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PremarketOfferClient<$Result.GetResult<Prisma.$PremarketOfferPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PremarketOffer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremarketOfferFindFirstArgs} args - Arguments to find a PremarketOffer
     * @example
     * // Get one PremarketOffer
     * const premarketOffer = await prisma.premarketOffer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PremarketOfferFindFirstArgs>(args?: SelectSubset<T, PremarketOfferFindFirstArgs<ExtArgs>>): Prisma__PremarketOfferClient<$Result.GetResult<Prisma.$PremarketOfferPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PremarketOffer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremarketOfferFindFirstOrThrowArgs} args - Arguments to find a PremarketOffer
     * @example
     * // Get one PremarketOffer
     * const premarketOffer = await prisma.premarketOffer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PremarketOfferFindFirstOrThrowArgs>(args?: SelectSubset<T, PremarketOfferFindFirstOrThrowArgs<ExtArgs>>): Prisma__PremarketOfferClient<$Result.GetResult<Prisma.$PremarketOfferPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PremarketOffers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremarketOfferFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PremarketOffers
     * const premarketOffers = await prisma.premarketOffer.findMany()
     * 
     * // Get first 10 PremarketOffers
     * const premarketOffers = await prisma.premarketOffer.findMany({ take: 10 })
     * 
     * // Only select the `offer_addr`
     * const premarketOfferWithOffer_addrOnly = await prisma.premarketOffer.findMany({ select: { offer_addr: true } })
     * 
     */
    findMany<T extends PremarketOfferFindManyArgs>(args?: SelectSubset<T, PremarketOfferFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PremarketOfferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PremarketOffer.
     * @param {PremarketOfferCreateArgs} args - Arguments to create a PremarketOffer.
     * @example
     * // Create one PremarketOffer
     * const PremarketOffer = await prisma.premarketOffer.create({
     *   data: {
     *     // ... data to create a PremarketOffer
     *   }
     * })
     * 
     */
    create<T extends PremarketOfferCreateArgs>(args: SelectSubset<T, PremarketOfferCreateArgs<ExtArgs>>): Prisma__PremarketOfferClient<$Result.GetResult<Prisma.$PremarketOfferPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PremarketOffers.
     * @param {PremarketOfferCreateManyArgs} args - Arguments to create many PremarketOffers.
     * @example
     * // Create many PremarketOffers
     * const premarketOffer = await prisma.premarketOffer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PremarketOfferCreateManyArgs>(args?: SelectSubset<T, PremarketOfferCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PremarketOffers and returns the data saved in the database.
     * @param {PremarketOfferCreateManyAndReturnArgs} args - Arguments to create many PremarketOffers.
     * @example
     * // Create many PremarketOffers
     * const premarketOffer = await prisma.premarketOffer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PremarketOffers and only return the `offer_addr`
     * const premarketOfferWithOffer_addrOnly = await prisma.premarketOffer.createManyAndReturn({
     *   select: { offer_addr: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PremarketOfferCreateManyAndReturnArgs>(args?: SelectSubset<T, PremarketOfferCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PremarketOfferPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PremarketOffer.
     * @param {PremarketOfferDeleteArgs} args - Arguments to delete one PremarketOffer.
     * @example
     * // Delete one PremarketOffer
     * const PremarketOffer = await prisma.premarketOffer.delete({
     *   where: {
     *     // ... filter to delete one PremarketOffer
     *   }
     * })
     * 
     */
    delete<T extends PremarketOfferDeleteArgs>(args: SelectSubset<T, PremarketOfferDeleteArgs<ExtArgs>>): Prisma__PremarketOfferClient<$Result.GetResult<Prisma.$PremarketOfferPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PremarketOffer.
     * @param {PremarketOfferUpdateArgs} args - Arguments to update one PremarketOffer.
     * @example
     * // Update one PremarketOffer
     * const premarketOffer = await prisma.premarketOffer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PremarketOfferUpdateArgs>(args: SelectSubset<T, PremarketOfferUpdateArgs<ExtArgs>>): Prisma__PremarketOfferClient<$Result.GetResult<Prisma.$PremarketOfferPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PremarketOffers.
     * @param {PremarketOfferDeleteManyArgs} args - Arguments to filter PremarketOffers to delete.
     * @example
     * // Delete a few PremarketOffers
     * const { count } = await prisma.premarketOffer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PremarketOfferDeleteManyArgs>(args?: SelectSubset<T, PremarketOfferDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PremarketOffers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremarketOfferUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PremarketOffers
     * const premarketOffer = await prisma.premarketOffer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PremarketOfferUpdateManyArgs>(args: SelectSubset<T, PremarketOfferUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PremarketOffers and returns the data updated in the database.
     * @param {PremarketOfferUpdateManyAndReturnArgs} args - Arguments to update many PremarketOffers.
     * @example
     * // Update many PremarketOffers
     * const premarketOffer = await prisma.premarketOffer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PremarketOffers and only return the `offer_addr`
     * const premarketOfferWithOffer_addrOnly = await prisma.premarketOffer.updateManyAndReturn({
     *   select: { offer_addr: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PremarketOfferUpdateManyAndReturnArgs>(args: SelectSubset<T, PremarketOfferUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PremarketOfferPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PremarketOffer.
     * @param {PremarketOfferUpsertArgs} args - Arguments to update or create a PremarketOffer.
     * @example
     * // Update or create a PremarketOffer
     * const premarketOffer = await prisma.premarketOffer.upsert({
     *   create: {
     *     // ... data to create a PremarketOffer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PremarketOffer we want to update
     *   }
     * })
     */
    upsert<T extends PremarketOfferUpsertArgs>(args: SelectSubset<T, PremarketOfferUpsertArgs<ExtArgs>>): Prisma__PremarketOfferClient<$Result.GetResult<Prisma.$PremarketOfferPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PremarketOffers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremarketOfferCountArgs} args - Arguments to filter PremarketOffers to count.
     * @example
     * // Count the number of PremarketOffers
     * const count = await prisma.premarketOffer.count({
     *   where: {
     *     // ... the filter for the PremarketOffers we want to count
     *   }
     * })
    **/
    count<T extends PremarketOfferCountArgs>(
      args?: Subset<T, PremarketOfferCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PremarketOfferCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PremarketOffer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremarketOfferAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PremarketOfferAggregateArgs>(args: Subset<T, PremarketOfferAggregateArgs>): Prisma.PrismaPromise<GetPremarketOfferAggregateType<T>>

    /**
     * Group by PremarketOffer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremarketOfferGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PremarketOfferGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PremarketOfferGroupByArgs['orderBy'] }
        : { orderBy?: PremarketOfferGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PremarketOfferGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPremarketOfferGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PremarketOffer model
   */
  readonly fields: PremarketOfferFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PremarketOffer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PremarketOfferClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    token<T extends PremarketTokenDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PremarketTokenDefaultArgs<ExtArgs>>): Prisma__PremarketTokenClient<$Result.GetResult<Prisma.$PremarketTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    orders<T extends PremarketOffer$ordersArgs<ExtArgs> = {}>(args?: Subset<T, PremarketOffer$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PremarketOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PremarketOffer model
   */
  interface PremarketOfferFieldRefs {
    readonly offer_addr: FieldRef<"PremarketOffer", 'String'>
    readonly token_addr: FieldRef<"PremarketOffer", 'String'>
    readonly price: FieldRef<"PremarketOffer", 'BigInt'>
    readonly amount: FieldRef<"PremarketOffer", 'BigInt'>
    readonly is_buy: FieldRef<"PremarketOffer", 'Boolean'>
    readonly is_full_match: FieldRef<"PremarketOffer", 'Boolean'>
    readonly created_by: FieldRef<"PremarketOffer", 'String'>
    readonly ts: FieldRef<"PremarketOffer", 'BigInt'>
    readonly filled_amount: FieldRef<"PremarketOffer", 'BigInt'>
    readonly is_active: FieldRef<"PremarketOffer", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * PremarketOffer findUnique
   */
  export type PremarketOfferFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketOffer
     */
    select?: PremarketOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketOffer
     */
    omit?: PremarketOfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketOfferInclude<ExtArgs> | null
    /**
     * Filter, which PremarketOffer to fetch.
     */
    where: PremarketOfferWhereUniqueInput
  }

  /**
   * PremarketOffer findUniqueOrThrow
   */
  export type PremarketOfferFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketOffer
     */
    select?: PremarketOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketOffer
     */
    omit?: PremarketOfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketOfferInclude<ExtArgs> | null
    /**
     * Filter, which PremarketOffer to fetch.
     */
    where: PremarketOfferWhereUniqueInput
  }

  /**
   * PremarketOffer findFirst
   */
  export type PremarketOfferFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketOffer
     */
    select?: PremarketOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketOffer
     */
    omit?: PremarketOfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketOfferInclude<ExtArgs> | null
    /**
     * Filter, which PremarketOffer to fetch.
     */
    where?: PremarketOfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PremarketOffers to fetch.
     */
    orderBy?: PremarketOfferOrderByWithRelationInput | PremarketOfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PremarketOffers.
     */
    cursor?: PremarketOfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PremarketOffers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PremarketOffers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PremarketOffers.
     */
    distinct?: PremarketOfferScalarFieldEnum | PremarketOfferScalarFieldEnum[]
  }

  /**
   * PremarketOffer findFirstOrThrow
   */
  export type PremarketOfferFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketOffer
     */
    select?: PremarketOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketOffer
     */
    omit?: PremarketOfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketOfferInclude<ExtArgs> | null
    /**
     * Filter, which PremarketOffer to fetch.
     */
    where?: PremarketOfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PremarketOffers to fetch.
     */
    orderBy?: PremarketOfferOrderByWithRelationInput | PremarketOfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PremarketOffers.
     */
    cursor?: PremarketOfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PremarketOffers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PremarketOffers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PremarketOffers.
     */
    distinct?: PremarketOfferScalarFieldEnum | PremarketOfferScalarFieldEnum[]
  }

  /**
   * PremarketOffer findMany
   */
  export type PremarketOfferFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketOffer
     */
    select?: PremarketOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketOffer
     */
    omit?: PremarketOfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketOfferInclude<ExtArgs> | null
    /**
     * Filter, which PremarketOffers to fetch.
     */
    where?: PremarketOfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PremarketOffers to fetch.
     */
    orderBy?: PremarketOfferOrderByWithRelationInput | PremarketOfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PremarketOffers.
     */
    cursor?: PremarketOfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PremarketOffers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PremarketOffers.
     */
    skip?: number
    distinct?: PremarketOfferScalarFieldEnum | PremarketOfferScalarFieldEnum[]
  }

  /**
   * PremarketOffer create
   */
  export type PremarketOfferCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketOffer
     */
    select?: PremarketOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketOffer
     */
    omit?: PremarketOfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketOfferInclude<ExtArgs> | null
    /**
     * The data needed to create a PremarketOffer.
     */
    data: XOR<PremarketOfferCreateInput, PremarketOfferUncheckedCreateInput>
  }

  /**
   * PremarketOffer createMany
   */
  export type PremarketOfferCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PremarketOffers.
     */
    data: PremarketOfferCreateManyInput | PremarketOfferCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PremarketOffer createManyAndReturn
   */
  export type PremarketOfferCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketOffer
     */
    select?: PremarketOfferSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketOffer
     */
    omit?: PremarketOfferOmit<ExtArgs> | null
    /**
     * The data used to create many PremarketOffers.
     */
    data: PremarketOfferCreateManyInput | PremarketOfferCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketOfferIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PremarketOffer update
   */
  export type PremarketOfferUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketOffer
     */
    select?: PremarketOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketOffer
     */
    omit?: PremarketOfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketOfferInclude<ExtArgs> | null
    /**
     * The data needed to update a PremarketOffer.
     */
    data: XOR<PremarketOfferUpdateInput, PremarketOfferUncheckedUpdateInput>
    /**
     * Choose, which PremarketOffer to update.
     */
    where: PremarketOfferWhereUniqueInput
  }

  /**
   * PremarketOffer updateMany
   */
  export type PremarketOfferUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PremarketOffers.
     */
    data: XOR<PremarketOfferUpdateManyMutationInput, PremarketOfferUncheckedUpdateManyInput>
    /**
     * Filter which PremarketOffers to update
     */
    where?: PremarketOfferWhereInput
    /**
     * Limit how many PremarketOffers to update.
     */
    limit?: number
  }

  /**
   * PremarketOffer updateManyAndReturn
   */
  export type PremarketOfferUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketOffer
     */
    select?: PremarketOfferSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketOffer
     */
    omit?: PremarketOfferOmit<ExtArgs> | null
    /**
     * The data used to update PremarketOffers.
     */
    data: XOR<PremarketOfferUpdateManyMutationInput, PremarketOfferUncheckedUpdateManyInput>
    /**
     * Filter which PremarketOffers to update
     */
    where?: PremarketOfferWhereInput
    /**
     * Limit how many PremarketOffers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketOfferIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PremarketOffer upsert
   */
  export type PremarketOfferUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketOffer
     */
    select?: PremarketOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketOffer
     */
    omit?: PremarketOfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketOfferInclude<ExtArgs> | null
    /**
     * The filter to search for the PremarketOffer to update in case it exists.
     */
    where: PremarketOfferWhereUniqueInput
    /**
     * In case the PremarketOffer found by the `where` argument doesn't exist, create a new PremarketOffer with this data.
     */
    create: XOR<PremarketOfferCreateInput, PremarketOfferUncheckedCreateInput>
    /**
     * In case the PremarketOffer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PremarketOfferUpdateInput, PremarketOfferUncheckedUpdateInput>
  }

  /**
   * PremarketOffer delete
   */
  export type PremarketOfferDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketOffer
     */
    select?: PremarketOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketOffer
     */
    omit?: PremarketOfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketOfferInclude<ExtArgs> | null
    /**
     * Filter which PremarketOffer to delete.
     */
    where: PremarketOfferWhereUniqueInput
  }

  /**
   * PremarketOffer deleteMany
   */
  export type PremarketOfferDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PremarketOffers to delete
     */
    where?: PremarketOfferWhereInput
    /**
     * Limit how many PremarketOffers to delete.
     */
    limit?: number
  }

  /**
   * PremarketOffer.orders
   */
  export type PremarketOffer$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketOrder
     */
    select?: PremarketOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketOrder
     */
    omit?: PremarketOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketOrderInclude<ExtArgs> | null
    where?: PremarketOrderWhereInput
    orderBy?: PremarketOrderOrderByWithRelationInput | PremarketOrderOrderByWithRelationInput[]
    cursor?: PremarketOrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PremarketOrderScalarFieldEnum | PremarketOrderScalarFieldEnum[]
  }

  /**
   * PremarketOffer without action
   */
  export type PremarketOfferDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketOffer
     */
    select?: PremarketOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketOffer
     */
    omit?: PremarketOfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketOfferInclude<ExtArgs> | null
  }


  /**
   * Model PremarketOrder
   */

  export type AggregatePremarketOrder = {
    _count: PremarketOrderCountAggregateOutputType | null
    _avg: PremarketOrderAvgAggregateOutputType | null
    _sum: PremarketOrderSumAggregateOutputType | null
    _min: PremarketOrderMinAggregateOutputType | null
    _max: PremarketOrderMaxAggregateOutputType | null
  }

  export type PremarketOrderAvgAggregateOutputType = {
    amount: number | null
    ts: number | null
  }

  export type PremarketOrderSumAggregateOutputType = {
    amount: bigint | null
    ts: bigint | null
  }

  export type PremarketOrderMinAggregateOutputType = {
    order_addr: string | null
    token_addr: string | null
    offer_addr: string | null
    buyer: string | null
    seller: string | null
    amount: bigint | null
    created_by: string | null
    ts: bigint | null
    is_settled: boolean | null
    is_claimed: boolean | null
  }

  export type PremarketOrderMaxAggregateOutputType = {
    order_addr: string | null
    token_addr: string | null
    offer_addr: string | null
    buyer: string | null
    seller: string | null
    amount: bigint | null
    created_by: string | null
    ts: bigint | null
    is_settled: boolean | null
    is_claimed: boolean | null
  }

  export type PremarketOrderCountAggregateOutputType = {
    order_addr: number
    token_addr: number
    offer_addr: number
    buyer: number
    seller: number
    amount: number
    created_by: number
    ts: number
    is_settled: number
    is_claimed: number
    _all: number
  }


  export type PremarketOrderAvgAggregateInputType = {
    amount?: true
    ts?: true
  }

  export type PremarketOrderSumAggregateInputType = {
    amount?: true
    ts?: true
  }

  export type PremarketOrderMinAggregateInputType = {
    order_addr?: true
    token_addr?: true
    offer_addr?: true
    buyer?: true
    seller?: true
    amount?: true
    created_by?: true
    ts?: true
    is_settled?: true
    is_claimed?: true
  }

  export type PremarketOrderMaxAggregateInputType = {
    order_addr?: true
    token_addr?: true
    offer_addr?: true
    buyer?: true
    seller?: true
    amount?: true
    created_by?: true
    ts?: true
    is_settled?: true
    is_claimed?: true
  }

  export type PremarketOrderCountAggregateInputType = {
    order_addr?: true
    token_addr?: true
    offer_addr?: true
    buyer?: true
    seller?: true
    amount?: true
    created_by?: true
    ts?: true
    is_settled?: true
    is_claimed?: true
    _all?: true
  }

  export type PremarketOrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PremarketOrder to aggregate.
     */
    where?: PremarketOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PremarketOrders to fetch.
     */
    orderBy?: PremarketOrderOrderByWithRelationInput | PremarketOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PremarketOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PremarketOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PremarketOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PremarketOrders
    **/
    _count?: true | PremarketOrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PremarketOrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PremarketOrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PremarketOrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PremarketOrderMaxAggregateInputType
  }

  export type GetPremarketOrderAggregateType<T extends PremarketOrderAggregateArgs> = {
        [P in keyof T & keyof AggregatePremarketOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePremarketOrder[P]>
      : GetScalarType<T[P], AggregatePremarketOrder[P]>
  }




  export type PremarketOrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PremarketOrderWhereInput
    orderBy?: PremarketOrderOrderByWithAggregationInput | PremarketOrderOrderByWithAggregationInput[]
    by: PremarketOrderScalarFieldEnum[] | PremarketOrderScalarFieldEnum
    having?: PremarketOrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PremarketOrderCountAggregateInputType | true
    _avg?: PremarketOrderAvgAggregateInputType
    _sum?: PremarketOrderSumAggregateInputType
    _min?: PremarketOrderMinAggregateInputType
    _max?: PremarketOrderMaxAggregateInputType
  }

  export type PremarketOrderGroupByOutputType = {
    order_addr: string
    token_addr: string
    offer_addr: string
    buyer: string
    seller: string
    amount: bigint
    created_by: string
    ts: bigint
    is_settled: boolean
    is_claimed: boolean
    _count: PremarketOrderCountAggregateOutputType | null
    _avg: PremarketOrderAvgAggregateOutputType | null
    _sum: PremarketOrderSumAggregateOutputType | null
    _min: PremarketOrderMinAggregateOutputType | null
    _max: PremarketOrderMaxAggregateOutputType | null
  }

  type GetPremarketOrderGroupByPayload<T extends PremarketOrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PremarketOrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PremarketOrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PremarketOrderGroupByOutputType[P]>
            : GetScalarType<T[P], PremarketOrderGroupByOutputType[P]>
        }
      >
    >


  export type PremarketOrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    order_addr?: boolean
    token_addr?: boolean
    offer_addr?: boolean
    buyer?: boolean
    seller?: boolean
    amount?: boolean
    created_by?: boolean
    ts?: boolean
    is_settled?: boolean
    is_claimed?: boolean
    token?: boolean | PremarketTokenDefaultArgs<ExtArgs>
    offer?: boolean | PremarketOfferDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["premarketOrder"]>

  export type PremarketOrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    order_addr?: boolean
    token_addr?: boolean
    offer_addr?: boolean
    buyer?: boolean
    seller?: boolean
    amount?: boolean
    created_by?: boolean
    ts?: boolean
    is_settled?: boolean
    is_claimed?: boolean
    token?: boolean | PremarketTokenDefaultArgs<ExtArgs>
    offer?: boolean | PremarketOfferDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["premarketOrder"]>

  export type PremarketOrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    order_addr?: boolean
    token_addr?: boolean
    offer_addr?: boolean
    buyer?: boolean
    seller?: boolean
    amount?: boolean
    created_by?: boolean
    ts?: boolean
    is_settled?: boolean
    is_claimed?: boolean
    token?: boolean | PremarketTokenDefaultArgs<ExtArgs>
    offer?: boolean | PremarketOfferDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["premarketOrder"]>

  export type PremarketOrderSelectScalar = {
    order_addr?: boolean
    token_addr?: boolean
    offer_addr?: boolean
    buyer?: boolean
    seller?: boolean
    amount?: boolean
    created_by?: boolean
    ts?: boolean
    is_settled?: boolean
    is_claimed?: boolean
  }

  export type PremarketOrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"order_addr" | "token_addr" | "offer_addr" | "buyer" | "seller" | "amount" | "created_by" | "ts" | "is_settled" | "is_claimed", ExtArgs["result"]["premarketOrder"]>
  export type PremarketOrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    token?: boolean | PremarketTokenDefaultArgs<ExtArgs>
    offer?: boolean | PremarketOfferDefaultArgs<ExtArgs>
  }
  export type PremarketOrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    token?: boolean | PremarketTokenDefaultArgs<ExtArgs>
    offer?: boolean | PremarketOfferDefaultArgs<ExtArgs>
  }
  export type PremarketOrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    token?: boolean | PremarketTokenDefaultArgs<ExtArgs>
    offer?: boolean | PremarketOfferDefaultArgs<ExtArgs>
  }

  export type $PremarketOrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PremarketOrder"
    objects: {
      token: Prisma.$PremarketTokenPayload<ExtArgs>
      offer: Prisma.$PremarketOfferPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      order_addr: string
      token_addr: string
      offer_addr: string
      buyer: string
      seller: string
      amount: bigint
      created_by: string
      ts: bigint
      is_settled: boolean
      is_claimed: boolean
    }, ExtArgs["result"]["premarketOrder"]>
    composites: {}
  }

  type PremarketOrderGetPayload<S extends boolean | null | undefined | PremarketOrderDefaultArgs> = $Result.GetResult<Prisma.$PremarketOrderPayload, S>

  type PremarketOrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PremarketOrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PremarketOrderCountAggregateInputType | true
    }

  export interface PremarketOrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PremarketOrder'], meta: { name: 'PremarketOrder' } }
    /**
     * Find zero or one PremarketOrder that matches the filter.
     * @param {PremarketOrderFindUniqueArgs} args - Arguments to find a PremarketOrder
     * @example
     * // Get one PremarketOrder
     * const premarketOrder = await prisma.premarketOrder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PremarketOrderFindUniqueArgs>(args: SelectSubset<T, PremarketOrderFindUniqueArgs<ExtArgs>>): Prisma__PremarketOrderClient<$Result.GetResult<Prisma.$PremarketOrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PremarketOrder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PremarketOrderFindUniqueOrThrowArgs} args - Arguments to find a PremarketOrder
     * @example
     * // Get one PremarketOrder
     * const premarketOrder = await prisma.premarketOrder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PremarketOrderFindUniqueOrThrowArgs>(args: SelectSubset<T, PremarketOrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PremarketOrderClient<$Result.GetResult<Prisma.$PremarketOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PremarketOrder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremarketOrderFindFirstArgs} args - Arguments to find a PremarketOrder
     * @example
     * // Get one PremarketOrder
     * const premarketOrder = await prisma.premarketOrder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PremarketOrderFindFirstArgs>(args?: SelectSubset<T, PremarketOrderFindFirstArgs<ExtArgs>>): Prisma__PremarketOrderClient<$Result.GetResult<Prisma.$PremarketOrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PremarketOrder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremarketOrderFindFirstOrThrowArgs} args - Arguments to find a PremarketOrder
     * @example
     * // Get one PremarketOrder
     * const premarketOrder = await prisma.premarketOrder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PremarketOrderFindFirstOrThrowArgs>(args?: SelectSubset<T, PremarketOrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__PremarketOrderClient<$Result.GetResult<Prisma.$PremarketOrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PremarketOrders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremarketOrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PremarketOrders
     * const premarketOrders = await prisma.premarketOrder.findMany()
     * 
     * // Get first 10 PremarketOrders
     * const premarketOrders = await prisma.premarketOrder.findMany({ take: 10 })
     * 
     * // Only select the `order_addr`
     * const premarketOrderWithOrder_addrOnly = await prisma.premarketOrder.findMany({ select: { order_addr: true } })
     * 
     */
    findMany<T extends PremarketOrderFindManyArgs>(args?: SelectSubset<T, PremarketOrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PremarketOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PremarketOrder.
     * @param {PremarketOrderCreateArgs} args - Arguments to create a PremarketOrder.
     * @example
     * // Create one PremarketOrder
     * const PremarketOrder = await prisma.premarketOrder.create({
     *   data: {
     *     // ... data to create a PremarketOrder
     *   }
     * })
     * 
     */
    create<T extends PremarketOrderCreateArgs>(args: SelectSubset<T, PremarketOrderCreateArgs<ExtArgs>>): Prisma__PremarketOrderClient<$Result.GetResult<Prisma.$PremarketOrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PremarketOrders.
     * @param {PremarketOrderCreateManyArgs} args - Arguments to create many PremarketOrders.
     * @example
     * // Create many PremarketOrders
     * const premarketOrder = await prisma.premarketOrder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PremarketOrderCreateManyArgs>(args?: SelectSubset<T, PremarketOrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PremarketOrders and returns the data saved in the database.
     * @param {PremarketOrderCreateManyAndReturnArgs} args - Arguments to create many PremarketOrders.
     * @example
     * // Create many PremarketOrders
     * const premarketOrder = await prisma.premarketOrder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PremarketOrders and only return the `order_addr`
     * const premarketOrderWithOrder_addrOnly = await prisma.premarketOrder.createManyAndReturn({
     *   select: { order_addr: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PremarketOrderCreateManyAndReturnArgs>(args?: SelectSubset<T, PremarketOrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PremarketOrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PremarketOrder.
     * @param {PremarketOrderDeleteArgs} args - Arguments to delete one PremarketOrder.
     * @example
     * // Delete one PremarketOrder
     * const PremarketOrder = await prisma.premarketOrder.delete({
     *   where: {
     *     // ... filter to delete one PremarketOrder
     *   }
     * })
     * 
     */
    delete<T extends PremarketOrderDeleteArgs>(args: SelectSubset<T, PremarketOrderDeleteArgs<ExtArgs>>): Prisma__PremarketOrderClient<$Result.GetResult<Prisma.$PremarketOrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PremarketOrder.
     * @param {PremarketOrderUpdateArgs} args - Arguments to update one PremarketOrder.
     * @example
     * // Update one PremarketOrder
     * const premarketOrder = await prisma.premarketOrder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PremarketOrderUpdateArgs>(args: SelectSubset<T, PremarketOrderUpdateArgs<ExtArgs>>): Prisma__PremarketOrderClient<$Result.GetResult<Prisma.$PremarketOrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PremarketOrders.
     * @param {PremarketOrderDeleteManyArgs} args - Arguments to filter PremarketOrders to delete.
     * @example
     * // Delete a few PremarketOrders
     * const { count } = await prisma.premarketOrder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PremarketOrderDeleteManyArgs>(args?: SelectSubset<T, PremarketOrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PremarketOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremarketOrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PremarketOrders
     * const premarketOrder = await prisma.premarketOrder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PremarketOrderUpdateManyArgs>(args: SelectSubset<T, PremarketOrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PremarketOrders and returns the data updated in the database.
     * @param {PremarketOrderUpdateManyAndReturnArgs} args - Arguments to update many PremarketOrders.
     * @example
     * // Update many PremarketOrders
     * const premarketOrder = await prisma.premarketOrder.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PremarketOrders and only return the `order_addr`
     * const premarketOrderWithOrder_addrOnly = await prisma.premarketOrder.updateManyAndReturn({
     *   select: { order_addr: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PremarketOrderUpdateManyAndReturnArgs>(args: SelectSubset<T, PremarketOrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PremarketOrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PremarketOrder.
     * @param {PremarketOrderUpsertArgs} args - Arguments to update or create a PremarketOrder.
     * @example
     * // Update or create a PremarketOrder
     * const premarketOrder = await prisma.premarketOrder.upsert({
     *   create: {
     *     // ... data to create a PremarketOrder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PremarketOrder we want to update
     *   }
     * })
     */
    upsert<T extends PremarketOrderUpsertArgs>(args: SelectSubset<T, PremarketOrderUpsertArgs<ExtArgs>>): Prisma__PremarketOrderClient<$Result.GetResult<Prisma.$PremarketOrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PremarketOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremarketOrderCountArgs} args - Arguments to filter PremarketOrders to count.
     * @example
     * // Count the number of PremarketOrders
     * const count = await prisma.premarketOrder.count({
     *   where: {
     *     // ... the filter for the PremarketOrders we want to count
     *   }
     * })
    **/
    count<T extends PremarketOrderCountArgs>(
      args?: Subset<T, PremarketOrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PremarketOrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PremarketOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremarketOrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PremarketOrderAggregateArgs>(args: Subset<T, PremarketOrderAggregateArgs>): Prisma.PrismaPromise<GetPremarketOrderAggregateType<T>>

    /**
     * Group by PremarketOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremarketOrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PremarketOrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PremarketOrderGroupByArgs['orderBy'] }
        : { orderBy?: PremarketOrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PremarketOrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPremarketOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PremarketOrder model
   */
  readonly fields: PremarketOrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PremarketOrder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PremarketOrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    token<T extends PremarketTokenDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PremarketTokenDefaultArgs<ExtArgs>>): Prisma__PremarketTokenClient<$Result.GetResult<Prisma.$PremarketTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    offer<T extends PremarketOfferDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PremarketOfferDefaultArgs<ExtArgs>>): Prisma__PremarketOfferClient<$Result.GetResult<Prisma.$PremarketOfferPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PremarketOrder model
   */
  interface PremarketOrderFieldRefs {
    readonly order_addr: FieldRef<"PremarketOrder", 'String'>
    readonly token_addr: FieldRef<"PremarketOrder", 'String'>
    readonly offer_addr: FieldRef<"PremarketOrder", 'String'>
    readonly buyer: FieldRef<"PremarketOrder", 'String'>
    readonly seller: FieldRef<"PremarketOrder", 'String'>
    readonly amount: FieldRef<"PremarketOrder", 'BigInt'>
    readonly created_by: FieldRef<"PremarketOrder", 'String'>
    readonly ts: FieldRef<"PremarketOrder", 'BigInt'>
    readonly is_settled: FieldRef<"PremarketOrder", 'Boolean'>
    readonly is_claimed: FieldRef<"PremarketOrder", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * PremarketOrder findUnique
   */
  export type PremarketOrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketOrder
     */
    select?: PremarketOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketOrder
     */
    omit?: PremarketOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketOrderInclude<ExtArgs> | null
    /**
     * Filter, which PremarketOrder to fetch.
     */
    where: PremarketOrderWhereUniqueInput
  }

  /**
   * PremarketOrder findUniqueOrThrow
   */
  export type PremarketOrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketOrder
     */
    select?: PremarketOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketOrder
     */
    omit?: PremarketOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketOrderInclude<ExtArgs> | null
    /**
     * Filter, which PremarketOrder to fetch.
     */
    where: PremarketOrderWhereUniqueInput
  }

  /**
   * PremarketOrder findFirst
   */
  export type PremarketOrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketOrder
     */
    select?: PremarketOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketOrder
     */
    omit?: PremarketOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketOrderInclude<ExtArgs> | null
    /**
     * Filter, which PremarketOrder to fetch.
     */
    where?: PremarketOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PremarketOrders to fetch.
     */
    orderBy?: PremarketOrderOrderByWithRelationInput | PremarketOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PremarketOrders.
     */
    cursor?: PremarketOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PremarketOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PremarketOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PremarketOrders.
     */
    distinct?: PremarketOrderScalarFieldEnum | PremarketOrderScalarFieldEnum[]
  }

  /**
   * PremarketOrder findFirstOrThrow
   */
  export type PremarketOrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketOrder
     */
    select?: PremarketOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketOrder
     */
    omit?: PremarketOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketOrderInclude<ExtArgs> | null
    /**
     * Filter, which PremarketOrder to fetch.
     */
    where?: PremarketOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PremarketOrders to fetch.
     */
    orderBy?: PremarketOrderOrderByWithRelationInput | PremarketOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PremarketOrders.
     */
    cursor?: PremarketOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PremarketOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PremarketOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PremarketOrders.
     */
    distinct?: PremarketOrderScalarFieldEnum | PremarketOrderScalarFieldEnum[]
  }

  /**
   * PremarketOrder findMany
   */
  export type PremarketOrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketOrder
     */
    select?: PremarketOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketOrder
     */
    omit?: PremarketOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketOrderInclude<ExtArgs> | null
    /**
     * Filter, which PremarketOrders to fetch.
     */
    where?: PremarketOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PremarketOrders to fetch.
     */
    orderBy?: PremarketOrderOrderByWithRelationInput | PremarketOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PremarketOrders.
     */
    cursor?: PremarketOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PremarketOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PremarketOrders.
     */
    skip?: number
    distinct?: PremarketOrderScalarFieldEnum | PremarketOrderScalarFieldEnum[]
  }

  /**
   * PremarketOrder create
   */
  export type PremarketOrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketOrder
     */
    select?: PremarketOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketOrder
     */
    omit?: PremarketOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketOrderInclude<ExtArgs> | null
    /**
     * The data needed to create a PremarketOrder.
     */
    data: XOR<PremarketOrderCreateInput, PremarketOrderUncheckedCreateInput>
  }

  /**
   * PremarketOrder createMany
   */
  export type PremarketOrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PremarketOrders.
     */
    data: PremarketOrderCreateManyInput | PremarketOrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PremarketOrder createManyAndReturn
   */
  export type PremarketOrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketOrder
     */
    select?: PremarketOrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketOrder
     */
    omit?: PremarketOrderOmit<ExtArgs> | null
    /**
     * The data used to create many PremarketOrders.
     */
    data: PremarketOrderCreateManyInput | PremarketOrderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketOrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PremarketOrder update
   */
  export type PremarketOrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketOrder
     */
    select?: PremarketOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketOrder
     */
    omit?: PremarketOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketOrderInclude<ExtArgs> | null
    /**
     * The data needed to update a PremarketOrder.
     */
    data: XOR<PremarketOrderUpdateInput, PremarketOrderUncheckedUpdateInput>
    /**
     * Choose, which PremarketOrder to update.
     */
    where: PremarketOrderWhereUniqueInput
  }

  /**
   * PremarketOrder updateMany
   */
  export type PremarketOrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PremarketOrders.
     */
    data: XOR<PremarketOrderUpdateManyMutationInput, PremarketOrderUncheckedUpdateManyInput>
    /**
     * Filter which PremarketOrders to update
     */
    where?: PremarketOrderWhereInput
    /**
     * Limit how many PremarketOrders to update.
     */
    limit?: number
  }

  /**
   * PremarketOrder updateManyAndReturn
   */
  export type PremarketOrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketOrder
     */
    select?: PremarketOrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketOrder
     */
    omit?: PremarketOrderOmit<ExtArgs> | null
    /**
     * The data used to update PremarketOrders.
     */
    data: XOR<PremarketOrderUpdateManyMutationInput, PremarketOrderUncheckedUpdateManyInput>
    /**
     * Filter which PremarketOrders to update
     */
    where?: PremarketOrderWhereInput
    /**
     * Limit how many PremarketOrders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketOrderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PremarketOrder upsert
   */
  export type PremarketOrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketOrder
     */
    select?: PremarketOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketOrder
     */
    omit?: PremarketOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketOrderInclude<ExtArgs> | null
    /**
     * The filter to search for the PremarketOrder to update in case it exists.
     */
    where: PremarketOrderWhereUniqueInput
    /**
     * In case the PremarketOrder found by the `where` argument doesn't exist, create a new PremarketOrder with this data.
     */
    create: XOR<PremarketOrderCreateInput, PremarketOrderUncheckedCreateInput>
    /**
     * In case the PremarketOrder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PremarketOrderUpdateInput, PremarketOrderUncheckedUpdateInput>
  }

  /**
   * PremarketOrder delete
   */
  export type PremarketOrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketOrder
     */
    select?: PremarketOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketOrder
     */
    omit?: PremarketOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketOrderInclude<ExtArgs> | null
    /**
     * Filter which PremarketOrder to delete.
     */
    where: PremarketOrderWhereUniqueInput
  }

  /**
   * PremarketOrder deleteMany
   */
  export type PremarketOrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PremarketOrders to delete
     */
    where?: PremarketOrderWhereInput
    /**
     * Limit how many PremarketOrders to delete.
     */
    limit?: number
  }

  /**
   * PremarketOrder without action
   */
  export type PremarketOrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremarketOrder
     */
    select?: PremarketOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremarketOrder
     */
    omit?: PremarketOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremarketOrderInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PremarketTokenScalarFieldEnum: {
    token_addr: 'token_addr',
    name: 'name',
    symbol: 'symbol',
    website: 'website',
    twitter: 'twitter',
    telegram: 'telegram',
    settle_duration: 'settle_duration',
    temp_starts_at: 'temp_starts_at',
    temp_ends_at: 'temp_ends_at',
    settle_started_at: 'settle_started_at',
    status: 'status',
    fa: 'fa',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PremarketTokenScalarFieldEnum = (typeof PremarketTokenScalarFieldEnum)[keyof typeof PremarketTokenScalarFieldEnum]


  export const PremarketOfferScalarFieldEnum: {
    offer_addr: 'offer_addr',
    token_addr: 'token_addr',
    price: 'price',
    amount: 'amount',
    is_buy: 'is_buy',
    is_full_match: 'is_full_match',
    created_by: 'created_by',
    ts: 'ts',
    filled_amount: 'filled_amount',
    is_active: 'is_active'
  };

  export type PremarketOfferScalarFieldEnum = (typeof PremarketOfferScalarFieldEnum)[keyof typeof PremarketOfferScalarFieldEnum]


  export const PremarketOrderScalarFieldEnum: {
    order_addr: 'order_addr',
    token_addr: 'token_addr',
    offer_addr: 'offer_addr',
    buyer: 'buyer',
    seller: 'seller',
    amount: 'amount',
    created_by: 'created_by',
    ts: 'ts',
    is_settled: 'is_settled',
    is_claimed: 'is_claimed'
  };

  export type PremarketOrderScalarFieldEnum = (typeof PremarketOrderScalarFieldEnum)[keyof typeof PremarketOrderScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PremarketTokenWhereInput = {
    AND?: PremarketTokenWhereInput | PremarketTokenWhereInput[]
    OR?: PremarketTokenWhereInput[]
    NOT?: PremarketTokenWhereInput | PremarketTokenWhereInput[]
    token_addr?: StringFilter<"PremarketToken"> | string
    name?: StringFilter<"PremarketToken"> | string
    symbol?: StringFilter<"PremarketToken"> | string
    website?: StringNullableFilter<"PremarketToken"> | string | null
    twitter?: StringNullableFilter<"PremarketToken"> | string | null
    telegram?: StringNullableFilter<"PremarketToken"> | string | null
    settle_duration?: BigIntFilter<"PremarketToken"> | bigint | number
    temp_starts_at?: DateTimeNullableFilter<"PremarketToken"> | Date | string | null
    temp_ends_at?: DateTimeNullableFilter<"PremarketToken"> | Date | string | null
    settle_started_at?: BigIntNullableFilter<"PremarketToken"> | bigint | number | null
    status?: IntFilter<"PremarketToken"> | number
    fa?: StringNullableFilter<"PremarketToken"> | string | null
    createdAt?: DateTimeFilter<"PremarketToken"> | Date | string
    updatedAt?: DateTimeFilter<"PremarketToken"> | Date | string
    offers?: PremarketOfferListRelationFilter
    orders?: PremarketOrderListRelationFilter
  }

  export type PremarketTokenOrderByWithRelationInput = {
    token_addr?: SortOrder
    name?: SortOrder
    symbol?: SortOrder
    website?: SortOrderInput | SortOrder
    twitter?: SortOrderInput | SortOrder
    telegram?: SortOrderInput | SortOrder
    settle_duration?: SortOrder
    temp_starts_at?: SortOrderInput | SortOrder
    temp_ends_at?: SortOrderInput | SortOrder
    settle_started_at?: SortOrderInput | SortOrder
    status?: SortOrder
    fa?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    offers?: PremarketOfferOrderByRelationAggregateInput
    orders?: PremarketOrderOrderByRelationAggregateInput
  }

  export type PremarketTokenWhereUniqueInput = Prisma.AtLeast<{
    token_addr?: string
    AND?: PremarketTokenWhereInput | PremarketTokenWhereInput[]
    OR?: PremarketTokenWhereInput[]
    NOT?: PremarketTokenWhereInput | PremarketTokenWhereInput[]
    name?: StringFilter<"PremarketToken"> | string
    symbol?: StringFilter<"PremarketToken"> | string
    website?: StringNullableFilter<"PremarketToken"> | string | null
    twitter?: StringNullableFilter<"PremarketToken"> | string | null
    telegram?: StringNullableFilter<"PremarketToken"> | string | null
    settle_duration?: BigIntFilter<"PremarketToken"> | bigint | number
    temp_starts_at?: DateTimeNullableFilter<"PremarketToken"> | Date | string | null
    temp_ends_at?: DateTimeNullableFilter<"PremarketToken"> | Date | string | null
    settle_started_at?: BigIntNullableFilter<"PremarketToken"> | bigint | number | null
    status?: IntFilter<"PremarketToken"> | number
    fa?: StringNullableFilter<"PremarketToken"> | string | null
    createdAt?: DateTimeFilter<"PremarketToken"> | Date | string
    updatedAt?: DateTimeFilter<"PremarketToken"> | Date | string
    offers?: PremarketOfferListRelationFilter
    orders?: PremarketOrderListRelationFilter
  }, "token_addr">

  export type PremarketTokenOrderByWithAggregationInput = {
    token_addr?: SortOrder
    name?: SortOrder
    symbol?: SortOrder
    website?: SortOrderInput | SortOrder
    twitter?: SortOrderInput | SortOrder
    telegram?: SortOrderInput | SortOrder
    settle_duration?: SortOrder
    temp_starts_at?: SortOrderInput | SortOrder
    temp_ends_at?: SortOrderInput | SortOrder
    settle_started_at?: SortOrderInput | SortOrder
    status?: SortOrder
    fa?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PremarketTokenCountOrderByAggregateInput
    _avg?: PremarketTokenAvgOrderByAggregateInput
    _max?: PremarketTokenMaxOrderByAggregateInput
    _min?: PremarketTokenMinOrderByAggregateInput
    _sum?: PremarketTokenSumOrderByAggregateInput
  }

  export type PremarketTokenScalarWhereWithAggregatesInput = {
    AND?: PremarketTokenScalarWhereWithAggregatesInput | PremarketTokenScalarWhereWithAggregatesInput[]
    OR?: PremarketTokenScalarWhereWithAggregatesInput[]
    NOT?: PremarketTokenScalarWhereWithAggregatesInput | PremarketTokenScalarWhereWithAggregatesInput[]
    token_addr?: StringWithAggregatesFilter<"PremarketToken"> | string
    name?: StringWithAggregatesFilter<"PremarketToken"> | string
    symbol?: StringWithAggregatesFilter<"PremarketToken"> | string
    website?: StringNullableWithAggregatesFilter<"PremarketToken"> | string | null
    twitter?: StringNullableWithAggregatesFilter<"PremarketToken"> | string | null
    telegram?: StringNullableWithAggregatesFilter<"PremarketToken"> | string | null
    settle_duration?: BigIntWithAggregatesFilter<"PremarketToken"> | bigint | number
    temp_starts_at?: DateTimeNullableWithAggregatesFilter<"PremarketToken"> | Date | string | null
    temp_ends_at?: DateTimeNullableWithAggregatesFilter<"PremarketToken"> | Date | string | null
    settle_started_at?: BigIntNullableWithAggregatesFilter<"PremarketToken"> | bigint | number | null
    status?: IntWithAggregatesFilter<"PremarketToken"> | number
    fa?: StringNullableWithAggregatesFilter<"PremarketToken"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PremarketToken"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PremarketToken"> | Date | string
  }

  export type PremarketOfferWhereInput = {
    AND?: PremarketOfferWhereInput | PremarketOfferWhereInput[]
    OR?: PremarketOfferWhereInput[]
    NOT?: PremarketOfferWhereInput | PremarketOfferWhereInput[]
    offer_addr?: StringFilter<"PremarketOffer"> | string
    token_addr?: StringFilter<"PremarketOffer"> | string
    price?: BigIntFilter<"PremarketOffer"> | bigint | number
    amount?: BigIntFilter<"PremarketOffer"> | bigint | number
    is_buy?: BoolFilter<"PremarketOffer"> | boolean
    is_full_match?: BoolFilter<"PremarketOffer"> | boolean
    created_by?: StringFilter<"PremarketOffer"> | string
    ts?: BigIntFilter<"PremarketOffer"> | bigint | number
    filled_amount?: BigIntFilter<"PremarketOffer"> | bigint | number
    is_active?: BoolFilter<"PremarketOffer"> | boolean
    token?: XOR<PremarketTokenScalarRelationFilter, PremarketTokenWhereInput>
    orders?: PremarketOrderListRelationFilter
  }

  export type PremarketOfferOrderByWithRelationInput = {
    offer_addr?: SortOrder
    token_addr?: SortOrder
    price?: SortOrder
    amount?: SortOrder
    is_buy?: SortOrder
    is_full_match?: SortOrder
    created_by?: SortOrder
    ts?: SortOrder
    filled_amount?: SortOrder
    is_active?: SortOrder
    token?: PremarketTokenOrderByWithRelationInput
    orders?: PremarketOrderOrderByRelationAggregateInput
  }

  export type PremarketOfferWhereUniqueInput = Prisma.AtLeast<{
    offer_addr?: string
    AND?: PremarketOfferWhereInput | PremarketOfferWhereInput[]
    OR?: PremarketOfferWhereInput[]
    NOT?: PremarketOfferWhereInput | PremarketOfferWhereInput[]
    token_addr?: StringFilter<"PremarketOffer"> | string
    price?: BigIntFilter<"PremarketOffer"> | bigint | number
    amount?: BigIntFilter<"PremarketOffer"> | bigint | number
    is_buy?: BoolFilter<"PremarketOffer"> | boolean
    is_full_match?: BoolFilter<"PremarketOffer"> | boolean
    created_by?: StringFilter<"PremarketOffer"> | string
    ts?: BigIntFilter<"PremarketOffer"> | bigint | number
    filled_amount?: BigIntFilter<"PremarketOffer"> | bigint | number
    is_active?: BoolFilter<"PremarketOffer"> | boolean
    token?: XOR<PremarketTokenScalarRelationFilter, PremarketTokenWhereInput>
    orders?: PremarketOrderListRelationFilter
  }, "offer_addr">

  export type PremarketOfferOrderByWithAggregationInput = {
    offer_addr?: SortOrder
    token_addr?: SortOrder
    price?: SortOrder
    amount?: SortOrder
    is_buy?: SortOrder
    is_full_match?: SortOrder
    created_by?: SortOrder
    ts?: SortOrder
    filled_amount?: SortOrder
    is_active?: SortOrder
    _count?: PremarketOfferCountOrderByAggregateInput
    _avg?: PremarketOfferAvgOrderByAggregateInput
    _max?: PremarketOfferMaxOrderByAggregateInput
    _min?: PremarketOfferMinOrderByAggregateInput
    _sum?: PremarketOfferSumOrderByAggregateInput
  }

  export type PremarketOfferScalarWhereWithAggregatesInput = {
    AND?: PremarketOfferScalarWhereWithAggregatesInput | PremarketOfferScalarWhereWithAggregatesInput[]
    OR?: PremarketOfferScalarWhereWithAggregatesInput[]
    NOT?: PremarketOfferScalarWhereWithAggregatesInput | PremarketOfferScalarWhereWithAggregatesInput[]
    offer_addr?: StringWithAggregatesFilter<"PremarketOffer"> | string
    token_addr?: StringWithAggregatesFilter<"PremarketOffer"> | string
    price?: BigIntWithAggregatesFilter<"PremarketOffer"> | bigint | number
    amount?: BigIntWithAggregatesFilter<"PremarketOffer"> | bigint | number
    is_buy?: BoolWithAggregatesFilter<"PremarketOffer"> | boolean
    is_full_match?: BoolWithAggregatesFilter<"PremarketOffer"> | boolean
    created_by?: StringWithAggregatesFilter<"PremarketOffer"> | string
    ts?: BigIntWithAggregatesFilter<"PremarketOffer"> | bigint | number
    filled_amount?: BigIntWithAggregatesFilter<"PremarketOffer"> | bigint | number
    is_active?: BoolWithAggregatesFilter<"PremarketOffer"> | boolean
  }

  export type PremarketOrderWhereInput = {
    AND?: PremarketOrderWhereInput | PremarketOrderWhereInput[]
    OR?: PremarketOrderWhereInput[]
    NOT?: PremarketOrderWhereInput | PremarketOrderWhereInput[]
    order_addr?: StringFilter<"PremarketOrder"> | string
    token_addr?: StringFilter<"PremarketOrder"> | string
    offer_addr?: StringFilter<"PremarketOrder"> | string
    buyer?: StringFilter<"PremarketOrder"> | string
    seller?: StringFilter<"PremarketOrder"> | string
    amount?: BigIntFilter<"PremarketOrder"> | bigint | number
    created_by?: StringFilter<"PremarketOrder"> | string
    ts?: BigIntFilter<"PremarketOrder"> | bigint | number
    is_settled?: BoolFilter<"PremarketOrder"> | boolean
    is_claimed?: BoolFilter<"PremarketOrder"> | boolean
    token?: XOR<PremarketTokenScalarRelationFilter, PremarketTokenWhereInput>
    offer?: XOR<PremarketOfferScalarRelationFilter, PremarketOfferWhereInput>
  }

  export type PremarketOrderOrderByWithRelationInput = {
    order_addr?: SortOrder
    token_addr?: SortOrder
    offer_addr?: SortOrder
    buyer?: SortOrder
    seller?: SortOrder
    amount?: SortOrder
    created_by?: SortOrder
    ts?: SortOrder
    is_settled?: SortOrder
    is_claimed?: SortOrder
    token?: PremarketTokenOrderByWithRelationInput
    offer?: PremarketOfferOrderByWithRelationInput
  }

  export type PremarketOrderWhereUniqueInput = Prisma.AtLeast<{
    order_addr?: string
    AND?: PremarketOrderWhereInput | PremarketOrderWhereInput[]
    OR?: PremarketOrderWhereInput[]
    NOT?: PremarketOrderWhereInput | PremarketOrderWhereInput[]
    token_addr?: StringFilter<"PremarketOrder"> | string
    offer_addr?: StringFilter<"PremarketOrder"> | string
    buyer?: StringFilter<"PremarketOrder"> | string
    seller?: StringFilter<"PremarketOrder"> | string
    amount?: BigIntFilter<"PremarketOrder"> | bigint | number
    created_by?: StringFilter<"PremarketOrder"> | string
    ts?: BigIntFilter<"PremarketOrder"> | bigint | number
    is_settled?: BoolFilter<"PremarketOrder"> | boolean
    is_claimed?: BoolFilter<"PremarketOrder"> | boolean
    token?: XOR<PremarketTokenScalarRelationFilter, PremarketTokenWhereInput>
    offer?: XOR<PremarketOfferScalarRelationFilter, PremarketOfferWhereInput>
  }, "order_addr">

  export type PremarketOrderOrderByWithAggregationInput = {
    order_addr?: SortOrder
    token_addr?: SortOrder
    offer_addr?: SortOrder
    buyer?: SortOrder
    seller?: SortOrder
    amount?: SortOrder
    created_by?: SortOrder
    ts?: SortOrder
    is_settled?: SortOrder
    is_claimed?: SortOrder
    _count?: PremarketOrderCountOrderByAggregateInput
    _avg?: PremarketOrderAvgOrderByAggregateInput
    _max?: PremarketOrderMaxOrderByAggregateInput
    _min?: PremarketOrderMinOrderByAggregateInput
    _sum?: PremarketOrderSumOrderByAggregateInput
  }

  export type PremarketOrderScalarWhereWithAggregatesInput = {
    AND?: PremarketOrderScalarWhereWithAggregatesInput | PremarketOrderScalarWhereWithAggregatesInput[]
    OR?: PremarketOrderScalarWhereWithAggregatesInput[]
    NOT?: PremarketOrderScalarWhereWithAggregatesInput | PremarketOrderScalarWhereWithAggregatesInput[]
    order_addr?: StringWithAggregatesFilter<"PremarketOrder"> | string
    token_addr?: StringWithAggregatesFilter<"PremarketOrder"> | string
    offer_addr?: StringWithAggregatesFilter<"PremarketOrder"> | string
    buyer?: StringWithAggregatesFilter<"PremarketOrder"> | string
    seller?: StringWithAggregatesFilter<"PremarketOrder"> | string
    amount?: BigIntWithAggregatesFilter<"PremarketOrder"> | bigint | number
    created_by?: StringWithAggregatesFilter<"PremarketOrder"> | string
    ts?: BigIntWithAggregatesFilter<"PremarketOrder"> | bigint | number
    is_settled?: BoolWithAggregatesFilter<"PremarketOrder"> | boolean
    is_claimed?: BoolWithAggregatesFilter<"PremarketOrder"> | boolean
  }

  export type PremarketTokenCreateInput = {
    token_addr: string
    name: string
    symbol: string
    website?: string | null
    twitter?: string | null
    telegram?: string | null
    settle_duration: bigint | number
    temp_starts_at?: Date | string | null
    temp_ends_at?: Date | string | null
    settle_started_at?: bigint | number | null
    status?: number
    fa?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offers?: PremarketOfferCreateNestedManyWithoutTokenInput
    orders?: PremarketOrderCreateNestedManyWithoutTokenInput
  }

  export type PremarketTokenUncheckedCreateInput = {
    token_addr: string
    name: string
    symbol: string
    website?: string | null
    twitter?: string | null
    telegram?: string | null
    settle_duration: bigint | number
    temp_starts_at?: Date | string | null
    temp_ends_at?: Date | string | null
    settle_started_at?: bigint | number | null
    status?: number
    fa?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offers?: PremarketOfferUncheckedCreateNestedManyWithoutTokenInput
    orders?: PremarketOrderUncheckedCreateNestedManyWithoutTokenInput
  }

  export type PremarketTokenUpdateInput = {
    token_addr?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    settle_duration?: BigIntFieldUpdateOperationsInput | bigint | number
    temp_starts_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    temp_ends_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settle_started_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: IntFieldUpdateOperationsInput | number
    fa?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offers?: PremarketOfferUpdateManyWithoutTokenNestedInput
    orders?: PremarketOrderUpdateManyWithoutTokenNestedInput
  }

  export type PremarketTokenUncheckedUpdateInput = {
    token_addr?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    settle_duration?: BigIntFieldUpdateOperationsInput | bigint | number
    temp_starts_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    temp_ends_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settle_started_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: IntFieldUpdateOperationsInput | number
    fa?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offers?: PremarketOfferUncheckedUpdateManyWithoutTokenNestedInput
    orders?: PremarketOrderUncheckedUpdateManyWithoutTokenNestedInput
  }

  export type PremarketTokenCreateManyInput = {
    token_addr: string
    name: string
    symbol: string
    website?: string | null
    twitter?: string | null
    telegram?: string | null
    settle_duration: bigint | number
    temp_starts_at?: Date | string | null
    temp_ends_at?: Date | string | null
    settle_started_at?: bigint | number | null
    status?: number
    fa?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PremarketTokenUpdateManyMutationInput = {
    token_addr?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    settle_duration?: BigIntFieldUpdateOperationsInput | bigint | number
    temp_starts_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    temp_ends_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settle_started_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: IntFieldUpdateOperationsInput | number
    fa?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PremarketTokenUncheckedUpdateManyInput = {
    token_addr?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    settle_duration?: BigIntFieldUpdateOperationsInput | bigint | number
    temp_starts_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    temp_ends_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settle_started_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: IntFieldUpdateOperationsInput | number
    fa?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PremarketOfferCreateInput = {
    offer_addr: string
    price: bigint | number
    amount: bigint | number
    is_buy: boolean
    is_full_match: boolean
    created_by: string
    ts: bigint | number
    filled_amount: bigint | number
    is_active?: boolean
    token: PremarketTokenCreateNestedOneWithoutOffersInput
    orders?: PremarketOrderCreateNestedManyWithoutOfferInput
  }

  export type PremarketOfferUncheckedCreateInput = {
    offer_addr: string
    token_addr: string
    price: bigint | number
    amount: bigint | number
    is_buy: boolean
    is_full_match: boolean
    created_by: string
    ts: bigint | number
    filled_amount: bigint | number
    is_active?: boolean
    orders?: PremarketOrderUncheckedCreateNestedManyWithoutOfferInput
  }

  export type PremarketOfferUpdateInput = {
    offer_addr?: StringFieldUpdateOperationsInput | string
    price?: BigIntFieldUpdateOperationsInput | bigint | number
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    is_buy?: BoolFieldUpdateOperationsInput | boolean
    is_full_match?: BoolFieldUpdateOperationsInput | boolean
    created_by?: StringFieldUpdateOperationsInput | string
    ts?: BigIntFieldUpdateOperationsInput | bigint | number
    filled_amount?: BigIntFieldUpdateOperationsInput | bigint | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    token?: PremarketTokenUpdateOneRequiredWithoutOffersNestedInput
    orders?: PremarketOrderUpdateManyWithoutOfferNestedInput
  }

  export type PremarketOfferUncheckedUpdateInput = {
    offer_addr?: StringFieldUpdateOperationsInput | string
    token_addr?: StringFieldUpdateOperationsInput | string
    price?: BigIntFieldUpdateOperationsInput | bigint | number
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    is_buy?: BoolFieldUpdateOperationsInput | boolean
    is_full_match?: BoolFieldUpdateOperationsInput | boolean
    created_by?: StringFieldUpdateOperationsInput | string
    ts?: BigIntFieldUpdateOperationsInput | bigint | number
    filled_amount?: BigIntFieldUpdateOperationsInput | bigint | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    orders?: PremarketOrderUncheckedUpdateManyWithoutOfferNestedInput
  }

  export type PremarketOfferCreateManyInput = {
    offer_addr: string
    token_addr: string
    price: bigint | number
    amount: bigint | number
    is_buy: boolean
    is_full_match: boolean
    created_by: string
    ts: bigint | number
    filled_amount: bigint | number
    is_active?: boolean
  }

  export type PremarketOfferUpdateManyMutationInput = {
    offer_addr?: StringFieldUpdateOperationsInput | string
    price?: BigIntFieldUpdateOperationsInput | bigint | number
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    is_buy?: BoolFieldUpdateOperationsInput | boolean
    is_full_match?: BoolFieldUpdateOperationsInput | boolean
    created_by?: StringFieldUpdateOperationsInput | string
    ts?: BigIntFieldUpdateOperationsInput | bigint | number
    filled_amount?: BigIntFieldUpdateOperationsInput | bigint | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PremarketOfferUncheckedUpdateManyInput = {
    offer_addr?: StringFieldUpdateOperationsInput | string
    token_addr?: StringFieldUpdateOperationsInput | string
    price?: BigIntFieldUpdateOperationsInput | bigint | number
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    is_buy?: BoolFieldUpdateOperationsInput | boolean
    is_full_match?: BoolFieldUpdateOperationsInput | boolean
    created_by?: StringFieldUpdateOperationsInput | string
    ts?: BigIntFieldUpdateOperationsInput | bigint | number
    filled_amount?: BigIntFieldUpdateOperationsInput | bigint | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PremarketOrderCreateInput = {
    order_addr: string
    buyer: string
    seller: string
    amount: bigint | number
    created_by: string
    ts: bigint | number
    is_settled?: boolean
    is_claimed?: boolean
    token: PremarketTokenCreateNestedOneWithoutOrdersInput
    offer: PremarketOfferCreateNestedOneWithoutOrdersInput
  }

  export type PremarketOrderUncheckedCreateInput = {
    order_addr: string
    token_addr: string
    offer_addr: string
    buyer: string
    seller: string
    amount: bigint | number
    created_by: string
    ts: bigint | number
    is_settled?: boolean
    is_claimed?: boolean
  }

  export type PremarketOrderUpdateInput = {
    order_addr?: StringFieldUpdateOperationsInput | string
    buyer?: StringFieldUpdateOperationsInput | string
    seller?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    created_by?: StringFieldUpdateOperationsInput | string
    ts?: BigIntFieldUpdateOperationsInput | bigint | number
    is_settled?: BoolFieldUpdateOperationsInput | boolean
    is_claimed?: BoolFieldUpdateOperationsInput | boolean
    token?: PremarketTokenUpdateOneRequiredWithoutOrdersNestedInput
    offer?: PremarketOfferUpdateOneRequiredWithoutOrdersNestedInput
  }

  export type PremarketOrderUncheckedUpdateInput = {
    order_addr?: StringFieldUpdateOperationsInput | string
    token_addr?: StringFieldUpdateOperationsInput | string
    offer_addr?: StringFieldUpdateOperationsInput | string
    buyer?: StringFieldUpdateOperationsInput | string
    seller?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    created_by?: StringFieldUpdateOperationsInput | string
    ts?: BigIntFieldUpdateOperationsInput | bigint | number
    is_settled?: BoolFieldUpdateOperationsInput | boolean
    is_claimed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PremarketOrderCreateManyInput = {
    order_addr: string
    token_addr: string
    offer_addr: string
    buyer: string
    seller: string
    amount: bigint | number
    created_by: string
    ts: bigint | number
    is_settled?: boolean
    is_claimed?: boolean
  }

  export type PremarketOrderUpdateManyMutationInput = {
    order_addr?: StringFieldUpdateOperationsInput | string
    buyer?: StringFieldUpdateOperationsInput | string
    seller?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    created_by?: StringFieldUpdateOperationsInput | string
    ts?: BigIntFieldUpdateOperationsInput | bigint | number
    is_settled?: BoolFieldUpdateOperationsInput | boolean
    is_claimed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PremarketOrderUncheckedUpdateManyInput = {
    order_addr?: StringFieldUpdateOperationsInput | string
    token_addr?: StringFieldUpdateOperationsInput | string
    offer_addr?: StringFieldUpdateOperationsInput | string
    buyer?: StringFieldUpdateOperationsInput | string
    seller?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    created_by?: StringFieldUpdateOperationsInput | string
    ts?: BigIntFieldUpdateOperationsInput | bigint | number
    is_settled?: BoolFieldUpdateOperationsInput | boolean
    is_claimed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PremarketOfferListRelationFilter = {
    every?: PremarketOfferWhereInput
    some?: PremarketOfferWhereInput
    none?: PremarketOfferWhereInput
  }

  export type PremarketOrderListRelationFilter = {
    every?: PremarketOrderWhereInput
    some?: PremarketOrderWhereInput
    none?: PremarketOrderWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PremarketOfferOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PremarketOrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PremarketTokenCountOrderByAggregateInput = {
    token_addr?: SortOrder
    name?: SortOrder
    symbol?: SortOrder
    website?: SortOrder
    twitter?: SortOrder
    telegram?: SortOrder
    settle_duration?: SortOrder
    temp_starts_at?: SortOrder
    temp_ends_at?: SortOrder
    settle_started_at?: SortOrder
    status?: SortOrder
    fa?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PremarketTokenAvgOrderByAggregateInput = {
    settle_duration?: SortOrder
    settle_started_at?: SortOrder
    status?: SortOrder
  }

  export type PremarketTokenMaxOrderByAggregateInput = {
    token_addr?: SortOrder
    name?: SortOrder
    symbol?: SortOrder
    website?: SortOrder
    twitter?: SortOrder
    telegram?: SortOrder
    settle_duration?: SortOrder
    temp_starts_at?: SortOrder
    temp_ends_at?: SortOrder
    settle_started_at?: SortOrder
    status?: SortOrder
    fa?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PremarketTokenMinOrderByAggregateInput = {
    token_addr?: SortOrder
    name?: SortOrder
    symbol?: SortOrder
    website?: SortOrder
    twitter?: SortOrder
    telegram?: SortOrder
    settle_duration?: SortOrder
    temp_starts_at?: SortOrder
    temp_ends_at?: SortOrder
    settle_started_at?: SortOrder
    status?: SortOrder
    fa?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PremarketTokenSumOrderByAggregateInput = {
    settle_duration?: SortOrder
    settle_started_at?: SortOrder
    status?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type PremarketTokenScalarRelationFilter = {
    is?: PremarketTokenWhereInput
    isNot?: PremarketTokenWhereInput
  }

  export type PremarketOfferCountOrderByAggregateInput = {
    offer_addr?: SortOrder
    token_addr?: SortOrder
    price?: SortOrder
    amount?: SortOrder
    is_buy?: SortOrder
    is_full_match?: SortOrder
    created_by?: SortOrder
    ts?: SortOrder
    filled_amount?: SortOrder
    is_active?: SortOrder
  }

  export type PremarketOfferAvgOrderByAggregateInput = {
    price?: SortOrder
    amount?: SortOrder
    ts?: SortOrder
    filled_amount?: SortOrder
  }

  export type PremarketOfferMaxOrderByAggregateInput = {
    offer_addr?: SortOrder
    token_addr?: SortOrder
    price?: SortOrder
    amount?: SortOrder
    is_buy?: SortOrder
    is_full_match?: SortOrder
    created_by?: SortOrder
    ts?: SortOrder
    filled_amount?: SortOrder
    is_active?: SortOrder
  }

  export type PremarketOfferMinOrderByAggregateInput = {
    offer_addr?: SortOrder
    token_addr?: SortOrder
    price?: SortOrder
    amount?: SortOrder
    is_buy?: SortOrder
    is_full_match?: SortOrder
    created_by?: SortOrder
    ts?: SortOrder
    filled_amount?: SortOrder
    is_active?: SortOrder
  }

  export type PremarketOfferSumOrderByAggregateInput = {
    price?: SortOrder
    amount?: SortOrder
    ts?: SortOrder
    filled_amount?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PremarketOfferScalarRelationFilter = {
    is?: PremarketOfferWhereInput
    isNot?: PremarketOfferWhereInput
  }

  export type PremarketOrderCountOrderByAggregateInput = {
    order_addr?: SortOrder
    token_addr?: SortOrder
    offer_addr?: SortOrder
    buyer?: SortOrder
    seller?: SortOrder
    amount?: SortOrder
    created_by?: SortOrder
    ts?: SortOrder
    is_settled?: SortOrder
    is_claimed?: SortOrder
  }

  export type PremarketOrderAvgOrderByAggregateInput = {
    amount?: SortOrder
    ts?: SortOrder
  }

  export type PremarketOrderMaxOrderByAggregateInput = {
    order_addr?: SortOrder
    token_addr?: SortOrder
    offer_addr?: SortOrder
    buyer?: SortOrder
    seller?: SortOrder
    amount?: SortOrder
    created_by?: SortOrder
    ts?: SortOrder
    is_settled?: SortOrder
    is_claimed?: SortOrder
  }

  export type PremarketOrderMinOrderByAggregateInput = {
    order_addr?: SortOrder
    token_addr?: SortOrder
    offer_addr?: SortOrder
    buyer?: SortOrder
    seller?: SortOrder
    amount?: SortOrder
    created_by?: SortOrder
    ts?: SortOrder
    is_settled?: SortOrder
    is_claimed?: SortOrder
  }

  export type PremarketOrderSumOrderByAggregateInput = {
    amount?: SortOrder
    ts?: SortOrder
  }

  export type PremarketOfferCreateNestedManyWithoutTokenInput = {
    create?: XOR<PremarketOfferCreateWithoutTokenInput, PremarketOfferUncheckedCreateWithoutTokenInput> | PremarketOfferCreateWithoutTokenInput[] | PremarketOfferUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: PremarketOfferCreateOrConnectWithoutTokenInput | PremarketOfferCreateOrConnectWithoutTokenInput[]
    createMany?: PremarketOfferCreateManyTokenInputEnvelope
    connect?: PremarketOfferWhereUniqueInput | PremarketOfferWhereUniqueInput[]
  }

  export type PremarketOrderCreateNestedManyWithoutTokenInput = {
    create?: XOR<PremarketOrderCreateWithoutTokenInput, PremarketOrderUncheckedCreateWithoutTokenInput> | PremarketOrderCreateWithoutTokenInput[] | PremarketOrderUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: PremarketOrderCreateOrConnectWithoutTokenInput | PremarketOrderCreateOrConnectWithoutTokenInput[]
    createMany?: PremarketOrderCreateManyTokenInputEnvelope
    connect?: PremarketOrderWhereUniqueInput | PremarketOrderWhereUniqueInput[]
  }

  export type PremarketOfferUncheckedCreateNestedManyWithoutTokenInput = {
    create?: XOR<PremarketOfferCreateWithoutTokenInput, PremarketOfferUncheckedCreateWithoutTokenInput> | PremarketOfferCreateWithoutTokenInput[] | PremarketOfferUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: PremarketOfferCreateOrConnectWithoutTokenInput | PremarketOfferCreateOrConnectWithoutTokenInput[]
    createMany?: PremarketOfferCreateManyTokenInputEnvelope
    connect?: PremarketOfferWhereUniqueInput | PremarketOfferWhereUniqueInput[]
  }

  export type PremarketOrderUncheckedCreateNestedManyWithoutTokenInput = {
    create?: XOR<PremarketOrderCreateWithoutTokenInput, PremarketOrderUncheckedCreateWithoutTokenInput> | PremarketOrderCreateWithoutTokenInput[] | PremarketOrderUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: PremarketOrderCreateOrConnectWithoutTokenInput | PremarketOrderCreateOrConnectWithoutTokenInput[]
    createMany?: PremarketOrderCreateManyTokenInputEnvelope
    connect?: PremarketOrderWhereUniqueInput | PremarketOrderWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PremarketOfferUpdateManyWithoutTokenNestedInput = {
    create?: XOR<PremarketOfferCreateWithoutTokenInput, PremarketOfferUncheckedCreateWithoutTokenInput> | PremarketOfferCreateWithoutTokenInput[] | PremarketOfferUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: PremarketOfferCreateOrConnectWithoutTokenInput | PremarketOfferCreateOrConnectWithoutTokenInput[]
    upsert?: PremarketOfferUpsertWithWhereUniqueWithoutTokenInput | PremarketOfferUpsertWithWhereUniqueWithoutTokenInput[]
    createMany?: PremarketOfferCreateManyTokenInputEnvelope
    set?: PremarketOfferWhereUniqueInput | PremarketOfferWhereUniqueInput[]
    disconnect?: PremarketOfferWhereUniqueInput | PremarketOfferWhereUniqueInput[]
    delete?: PremarketOfferWhereUniqueInput | PremarketOfferWhereUniqueInput[]
    connect?: PremarketOfferWhereUniqueInput | PremarketOfferWhereUniqueInput[]
    update?: PremarketOfferUpdateWithWhereUniqueWithoutTokenInput | PremarketOfferUpdateWithWhereUniqueWithoutTokenInput[]
    updateMany?: PremarketOfferUpdateManyWithWhereWithoutTokenInput | PremarketOfferUpdateManyWithWhereWithoutTokenInput[]
    deleteMany?: PremarketOfferScalarWhereInput | PremarketOfferScalarWhereInput[]
  }

  export type PremarketOrderUpdateManyWithoutTokenNestedInput = {
    create?: XOR<PremarketOrderCreateWithoutTokenInput, PremarketOrderUncheckedCreateWithoutTokenInput> | PremarketOrderCreateWithoutTokenInput[] | PremarketOrderUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: PremarketOrderCreateOrConnectWithoutTokenInput | PremarketOrderCreateOrConnectWithoutTokenInput[]
    upsert?: PremarketOrderUpsertWithWhereUniqueWithoutTokenInput | PremarketOrderUpsertWithWhereUniqueWithoutTokenInput[]
    createMany?: PremarketOrderCreateManyTokenInputEnvelope
    set?: PremarketOrderWhereUniqueInput | PremarketOrderWhereUniqueInput[]
    disconnect?: PremarketOrderWhereUniqueInput | PremarketOrderWhereUniqueInput[]
    delete?: PremarketOrderWhereUniqueInput | PremarketOrderWhereUniqueInput[]
    connect?: PremarketOrderWhereUniqueInput | PremarketOrderWhereUniqueInput[]
    update?: PremarketOrderUpdateWithWhereUniqueWithoutTokenInput | PremarketOrderUpdateWithWhereUniqueWithoutTokenInput[]
    updateMany?: PremarketOrderUpdateManyWithWhereWithoutTokenInput | PremarketOrderUpdateManyWithWhereWithoutTokenInput[]
    deleteMany?: PremarketOrderScalarWhereInput | PremarketOrderScalarWhereInput[]
  }

  export type PremarketOfferUncheckedUpdateManyWithoutTokenNestedInput = {
    create?: XOR<PremarketOfferCreateWithoutTokenInput, PremarketOfferUncheckedCreateWithoutTokenInput> | PremarketOfferCreateWithoutTokenInput[] | PremarketOfferUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: PremarketOfferCreateOrConnectWithoutTokenInput | PremarketOfferCreateOrConnectWithoutTokenInput[]
    upsert?: PremarketOfferUpsertWithWhereUniqueWithoutTokenInput | PremarketOfferUpsertWithWhereUniqueWithoutTokenInput[]
    createMany?: PremarketOfferCreateManyTokenInputEnvelope
    set?: PremarketOfferWhereUniqueInput | PremarketOfferWhereUniqueInput[]
    disconnect?: PremarketOfferWhereUniqueInput | PremarketOfferWhereUniqueInput[]
    delete?: PremarketOfferWhereUniqueInput | PremarketOfferWhereUniqueInput[]
    connect?: PremarketOfferWhereUniqueInput | PremarketOfferWhereUniqueInput[]
    update?: PremarketOfferUpdateWithWhereUniqueWithoutTokenInput | PremarketOfferUpdateWithWhereUniqueWithoutTokenInput[]
    updateMany?: PremarketOfferUpdateManyWithWhereWithoutTokenInput | PremarketOfferUpdateManyWithWhereWithoutTokenInput[]
    deleteMany?: PremarketOfferScalarWhereInput | PremarketOfferScalarWhereInput[]
  }

  export type PremarketOrderUncheckedUpdateManyWithoutTokenNestedInput = {
    create?: XOR<PremarketOrderCreateWithoutTokenInput, PremarketOrderUncheckedCreateWithoutTokenInput> | PremarketOrderCreateWithoutTokenInput[] | PremarketOrderUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: PremarketOrderCreateOrConnectWithoutTokenInput | PremarketOrderCreateOrConnectWithoutTokenInput[]
    upsert?: PremarketOrderUpsertWithWhereUniqueWithoutTokenInput | PremarketOrderUpsertWithWhereUniqueWithoutTokenInput[]
    createMany?: PremarketOrderCreateManyTokenInputEnvelope
    set?: PremarketOrderWhereUniqueInput | PremarketOrderWhereUniqueInput[]
    disconnect?: PremarketOrderWhereUniqueInput | PremarketOrderWhereUniqueInput[]
    delete?: PremarketOrderWhereUniqueInput | PremarketOrderWhereUniqueInput[]
    connect?: PremarketOrderWhereUniqueInput | PremarketOrderWhereUniqueInput[]
    update?: PremarketOrderUpdateWithWhereUniqueWithoutTokenInput | PremarketOrderUpdateWithWhereUniqueWithoutTokenInput[]
    updateMany?: PremarketOrderUpdateManyWithWhereWithoutTokenInput | PremarketOrderUpdateManyWithWhereWithoutTokenInput[]
    deleteMany?: PremarketOrderScalarWhereInput | PremarketOrderScalarWhereInput[]
  }

  export type PremarketTokenCreateNestedOneWithoutOffersInput = {
    create?: XOR<PremarketTokenCreateWithoutOffersInput, PremarketTokenUncheckedCreateWithoutOffersInput>
    connectOrCreate?: PremarketTokenCreateOrConnectWithoutOffersInput
    connect?: PremarketTokenWhereUniqueInput
  }

  export type PremarketOrderCreateNestedManyWithoutOfferInput = {
    create?: XOR<PremarketOrderCreateWithoutOfferInput, PremarketOrderUncheckedCreateWithoutOfferInput> | PremarketOrderCreateWithoutOfferInput[] | PremarketOrderUncheckedCreateWithoutOfferInput[]
    connectOrCreate?: PremarketOrderCreateOrConnectWithoutOfferInput | PremarketOrderCreateOrConnectWithoutOfferInput[]
    createMany?: PremarketOrderCreateManyOfferInputEnvelope
    connect?: PremarketOrderWhereUniqueInput | PremarketOrderWhereUniqueInput[]
  }

  export type PremarketOrderUncheckedCreateNestedManyWithoutOfferInput = {
    create?: XOR<PremarketOrderCreateWithoutOfferInput, PremarketOrderUncheckedCreateWithoutOfferInput> | PremarketOrderCreateWithoutOfferInput[] | PremarketOrderUncheckedCreateWithoutOfferInput[]
    connectOrCreate?: PremarketOrderCreateOrConnectWithoutOfferInput | PremarketOrderCreateOrConnectWithoutOfferInput[]
    createMany?: PremarketOrderCreateManyOfferInputEnvelope
    connect?: PremarketOrderWhereUniqueInput | PremarketOrderWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type PremarketTokenUpdateOneRequiredWithoutOffersNestedInput = {
    create?: XOR<PremarketTokenCreateWithoutOffersInput, PremarketTokenUncheckedCreateWithoutOffersInput>
    connectOrCreate?: PremarketTokenCreateOrConnectWithoutOffersInput
    upsert?: PremarketTokenUpsertWithoutOffersInput
    connect?: PremarketTokenWhereUniqueInput
    update?: XOR<XOR<PremarketTokenUpdateToOneWithWhereWithoutOffersInput, PremarketTokenUpdateWithoutOffersInput>, PremarketTokenUncheckedUpdateWithoutOffersInput>
  }

  export type PremarketOrderUpdateManyWithoutOfferNestedInput = {
    create?: XOR<PremarketOrderCreateWithoutOfferInput, PremarketOrderUncheckedCreateWithoutOfferInput> | PremarketOrderCreateWithoutOfferInput[] | PremarketOrderUncheckedCreateWithoutOfferInput[]
    connectOrCreate?: PremarketOrderCreateOrConnectWithoutOfferInput | PremarketOrderCreateOrConnectWithoutOfferInput[]
    upsert?: PremarketOrderUpsertWithWhereUniqueWithoutOfferInput | PremarketOrderUpsertWithWhereUniqueWithoutOfferInput[]
    createMany?: PremarketOrderCreateManyOfferInputEnvelope
    set?: PremarketOrderWhereUniqueInput | PremarketOrderWhereUniqueInput[]
    disconnect?: PremarketOrderWhereUniqueInput | PremarketOrderWhereUniqueInput[]
    delete?: PremarketOrderWhereUniqueInput | PremarketOrderWhereUniqueInput[]
    connect?: PremarketOrderWhereUniqueInput | PremarketOrderWhereUniqueInput[]
    update?: PremarketOrderUpdateWithWhereUniqueWithoutOfferInput | PremarketOrderUpdateWithWhereUniqueWithoutOfferInput[]
    updateMany?: PremarketOrderUpdateManyWithWhereWithoutOfferInput | PremarketOrderUpdateManyWithWhereWithoutOfferInput[]
    deleteMany?: PremarketOrderScalarWhereInput | PremarketOrderScalarWhereInput[]
  }

  export type PremarketOrderUncheckedUpdateManyWithoutOfferNestedInput = {
    create?: XOR<PremarketOrderCreateWithoutOfferInput, PremarketOrderUncheckedCreateWithoutOfferInput> | PremarketOrderCreateWithoutOfferInput[] | PremarketOrderUncheckedCreateWithoutOfferInput[]
    connectOrCreate?: PremarketOrderCreateOrConnectWithoutOfferInput | PremarketOrderCreateOrConnectWithoutOfferInput[]
    upsert?: PremarketOrderUpsertWithWhereUniqueWithoutOfferInput | PremarketOrderUpsertWithWhereUniqueWithoutOfferInput[]
    createMany?: PremarketOrderCreateManyOfferInputEnvelope
    set?: PremarketOrderWhereUniqueInput | PremarketOrderWhereUniqueInput[]
    disconnect?: PremarketOrderWhereUniqueInput | PremarketOrderWhereUniqueInput[]
    delete?: PremarketOrderWhereUniqueInput | PremarketOrderWhereUniqueInput[]
    connect?: PremarketOrderWhereUniqueInput | PremarketOrderWhereUniqueInput[]
    update?: PremarketOrderUpdateWithWhereUniqueWithoutOfferInput | PremarketOrderUpdateWithWhereUniqueWithoutOfferInput[]
    updateMany?: PremarketOrderUpdateManyWithWhereWithoutOfferInput | PremarketOrderUpdateManyWithWhereWithoutOfferInput[]
    deleteMany?: PremarketOrderScalarWhereInput | PremarketOrderScalarWhereInput[]
  }

  export type PremarketTokenCreateNestedOneWithoutOrdersInput = {
    create?: XOR<PremarketTokenCreateWithoutOrdersInput, PremarketTokenUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: PremarketTokenCreateOrConnectWithoutOrdersInput
    connect?: PremarketTokenWhereUniqueInput
  }

  export type PremarketOfferCreateNestedOneWithoutOrdersInput = {
    create?: XOR<PremarketOfferCreateWithoutOrdersInput, PremarketOfferUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: PremarketOfferCreateOrConnectWithoutOrdersInput
    connect?: PremarketOfferWhereUniqueInput
  }

  export type PremarketTokenUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<PremarketTokenCreateWithoutOrdersInput, PremarketTokenUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: PremarketTokenCreateOrConnectWithoutOrdersInput
    upsert?: PremarketTokenUpsertWithoutOrdersInput
    connect?: PremarketTokenWhereUniqueInput
    update?: XOR<XOR<PremarketTokenUpdateToOneWithWhereWithoutOrdersInput, PremarketTokenUpdateWithoutOrdersInput>, PremarketTokenUncheckedUpdateWithoutOrdersInput>
  }

  export type PremarketOfferUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<PremarketOfferCreateWithoutOrdersInput, PremarketOfferUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: PremarketOfferCreateOrConnectWithoutOrdersInput
    upsert?: PremarketOfferUpsertWithoutOrdersInput
    connect?: PremarketOfferWhereUniqueInput
    update?: XOR<XOR<PremarketOfferUpdateToOneWithWhereWithoutOrdersInput, PremarketOfferUpdateWithoutOrdersInput>, PremarketOfferUncheckedUpdateWithoutOrdersInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PremarketOfferCreateWithoutTokenInput = {
    offer_addr: string
    price: bigint | number
    amount: bigint | number
    is_buy: boolean
    is_full_match: boolean
    created_by: string
    ts: bigint | number
    filled_amount: bigint | number
    is_active?: boolean
    orders?: PremarketOrderCreateNestedManyWithoutOfferInput
  }

  export type PremarketOfferUncheckedCreateWithoutTokenInput = {
    offer_addr: string
    price: bigint | number
    amount: bigint | number
    is_buy: boolean
    is_full_match: boolean
    created_by: string
    ts: bigint | number
    filled_amount: bigint | number
    is_active?: boolean
    orders?: PremarketOrderUncheckedCreateNestedManyWithoutOfferInput
  }

  export type PremarketOfferCreateOrConnectWithoutTokenInput = {
    where: PremarketOfferWhereUniqueInput
    create: XOR<PremarketOfferCreateWithoutTokenInput, PremarketOfferUncheckedCreateWithoutTokenInput>
  }

  export type PremarketOfferCreateManyTokenInputEnvelope = {
    data: PremarketOfferCreateManyTokenInput | PremarketOfferCreateManyTokenInput[]
    skipDuplicates?: boolean
  }

  export type PremarketOrderCreateWithoutTokenInput = {
    order_addr: string
    buyer: string
    seller: string
    amount: bigint | number
    created_by: string
    ts: bigint | number
    is_settled?: boolean
    is_claimed?: boolean
    offer: PremarketOfferCreateNestedOneWithoutOrdersInput
  }

  export type PremarketOrderUncheckedCreateWithoutTokenInput = {
    order_addr: string
    offer_addr: string
    buyer: string
    seller: string
    amount: bigint | number
    created_by: string
    ts: bigint | number
    is_settled?: boolean
    is_claimed?: boolean
  }

  export type PremarketOrderCreateOrConnectWithoutTokenInput = {
    where: PremarketOrderWhereUniqueInput
    create: XOR<PremarketOrderCreateWithoutTokenInput, PremarketOrderUncheckedCreateWithoutTokenInput>
  }

  export type PremarketOrderCreateManyTokenInputEnvelope = {
    data: PremarketOrderCreateManyTokenInput | PremarketOrderCreateManyTokenInput[]
    skipDuplicates?: boolean
  }

  export type PremarketOfferUpsertWithWhereUniqueWithoutTokenInput = {
    where: PremarketOfferWhereUniqueInput
    update: XOR<PremarketOfferUpdateWithoutTokenInput, PremarketOfferUncheckedUpdateWithoutTokenInput>
    create: XOR<PremarketOfferCreateWithoutTokenInput, PremarketOfferUncheckedCreateWithoutTokenInput>
  }

  export type PremarketOfferUpdateWithWhereUniqueWithoutTokenInput = {
    where: PremarketOfferWhereUniqueInput
    data: XOR<PremarketOfferUpdateWithoutTokenInput, PremarketOfferUncheckedUpdateWithoutTokenInput>
  }

  export type PremarketOfferUpdateManyWithWhereWithoutTokenInput = {
    where: PremarketOfferScalarWhereInput
    data: XOR<PremarketOfferUpdateManyMutationInput, PremarketOfferUncheckedUpdateManyWithoutTokenInput>
  }

  export type PremarketOfferScalarWhereInput = {
    AND?: PremarketOfferScalarWhereInput | PremarketOfferScalarWhereInput[]
    OR?: PremarketOfferScalarWhereInput[]
    NOT?: PremarketOfferScalarWhereInput | PremarketOfferScalarWhereInput[]
    offer_addr?: StringFilter<"PremarketOffer"> | string
    token_addr?: StringFilter<"PremarketOffer"> | string
    price?: BigIntFilter<"PremarketOffer"> | bigint | number
    amount?: BigIntFilter<"PremarketOffer"> | bigint | number
    is_buy?: BoolFilter<"PremarketOffer"> | boolean
    is_full_match?: BoolFilter<"PremarketOffer"> | boolean
    created_by?: StringFilter<"PremarketOffer"> | string
    ts?: BigIntFilter<"PremarketOffer"> | bigint | number
    filled_amount?: BigIntFilter<"PremarketOffer"> | bigint | number
    is_active?: BoolFilter<"PremarketOffer"> | boolean
  }

  export type PremarketOrderUpsertWithWhereUniqueWithoutTokenInput = {
    where: PremarketOrderWhereUniqueInput
    update: XOR<PremarketOrderUpdateWithoutTokenInput, PremarketOrderUncheckedUpdateWithoutTokenInput>
    create: XOR<PremarketOrderCreateWithoutTokenInput, PremarketOrderUncheckedCreateWithoutTokenInput>
  }

  export type PremarketOrderUpdateWithWhereUniqueWithoutTokenInput = {
    where: PremarketOrderWhereUniqueInput
    data: XOR<PremarketOrderUpdateWithoutTokenInput, PremarketOrderUncheckedUpdateWithoutTokenInput>
  }

  export type PremarketOrderUpdateManyWithWhereWithoutTokenInput = {
    where: PremarketOrderScalarWhereInput
    data: XOR<PremarketOrderUpdateManyMutationInput, PremarketOrderUncheckedUpdateManyWithoutTokenInput>
  }

  export type PremarketOrderScalarWhereInput = {
    AND?: PremarketOrderScalarWhereInput | PremarketOrderScalarWhereInput[]
    OR?: PremarketOrderScalarWhereInput[]
    NOT?: PremarketOrderScalarWhereInput | PremarketOrderScalarWhereInput[]
    order_addr?: StringFilter<"PremarketOrder"> | string
    token_addr?: StringFilter<"PremarketOrder"> | string
    offer_addr?: StringFilter<"PremarketOrder"> | string
    buyer?: StringFilter<"PremarketOrder"> | string
    seller?: StringFilter<"PremarketOrder"> | string
    amount?: BigIntFilter<"PremarketOrder"> | bigint | number
    created_by?: StringFilter<"PremarketOrder"> | string
    ts?: BigIntFilter<"PremarketOrder"> | bigint | number
    is_settled?: BoolFilter<"PremarketOrder"> | boolean
    is_claimed?: BoolFilter<"PremarketOrder"> | boolean
  }

  export type PremarketTokenCreateWithoutOffersInput = {
    token_addr: string
    name: string
    symbol: string
    website?: string | null
    twitter?: string | null
    telegram?: string | null
    settle_duration: bigint | number
    temp_starts_at?: Date | string | null
    temp_ends_at?: Date | string | null
    settle_started_at?: bigint | number | null
    status?: number
    fa?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: PremarketOrderCreateNestedManyWithoutTokenInput
  }

  export type PremarketTokenUncheckedCreateWithoutOffersInput = {
    token_addr: string
    name: string
    symbol: string
    website?: string | null
    twitter?: string | null
    telegram?: string | null
    settle_duration: bigint | number
    temp_starts_at?: Date | string | null
    temp_ends_at?: Date | string | null
    settle_started_at?: bigint | number | null
    status?: number
    fa?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: PremarketOrderUncheckedCreateNestedManyWithoutTokenInput
  }

  export type PremarketTokenCreateOrConnectWithoutOffersInput = {
    where: PremarketTokenWhereUniqueInput
    create: XOR<PremarketTokenCreateWithoutOffersInput, PremarketTokenUncheckedCreateWithoutOffersInput>
  }

  export type PremarketOrderCreateWithoutOfferInput = {
    order_addr: string
    buyer: string
    seller: string
    amount: bigint | number
    created_by: string
    ts: bigint | number
    is_settled?: boolean
    is_claimed?: boolean
    token: PremarketTokenCreateNestedOneWithoutOrdersInput
  }

  export type PremarketOrderUncheckedCreateWithoutOfferInput = {
    order_addr: string
    token_addr: string
    buyer: string
    seller: string
    amount: bigint | number
    created_by: string
    ts: bigint | number
    is_settled?: boolean
    is_claimed?: boolean
  }

  export type PremarketOrderCreateOrConnectWithoutOfferInput = {
    where: PremarketOrderWhereUniqueInput
    create: XOR<PremarketOrderCreateWithoutOfferInput, PremarketOrderUncheckedCreateWithoutOfferInput>
  }

  export type PremarketOrderCreateManyOfferInputEnvelope = {
    data: PremarketOrderCreateManyOfferInput | PremarketOrderCreateManyOfferInput[]
    skipDuplicates?: boolean
  }

  export type PremarketTokenUpsertWithoutOffersInput = {
    update: XOR<PremarketTokenUpdateWithoutOffersInput, PremarketTokenUncheckedUpdateWithoutOffersInput>
    create: XOR<PremarketTokenCreateWithoutOffersInput, PremarketTokenUncheckedCreateWithoutOffersInput>
    where?: PremarketTokenWhereInput
  }

  export type PremarketTokenUpdateToOneWithWhereWithoutOffersInput = {
    where?: PremarketTokenWhereInput
    data: XOR<PremarketTokenUpdateWithoutOffersInput, PremarketTokenUncheckedUpdateWithoutOffersInput>
  }

  export type PremarketTokenUpdateWithoutOffersInput = {
    token_addr?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    settle_duration?: BigIntFieldUpdateOperationsInput | bigint | number
    temp_starts_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    temp_ends_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settle_started_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: IntFieldUpdateOperationsInput | number
    fa?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: PremarketOrderUpdateManyWithoutTokenNestedInput
  }

  export type PremarketTokenUncheckedUpdateWithoutOffersInput = {
    token_addr?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    settle_duration?: BigIntFieldUpdateOperationsInput | bigint | number
    temp_starts_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    temp_ends_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settle_started_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: IntFieldUpdateOperationsInput | number
    fa?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: PremarketOrderUncheckedUpdateManyWithoutTokenNestedInput
  }

  export type PremarketOrderUpsertWithWhereUniqueWithoutOfferInput = {
    where: PremarketOrderWhereUniqueInput
    update: XOR<PremarketOrderUpdateWithoutOfferInput, PremarketOrderUncheckedUpdateWithoutOfferInput>
    create: XOR<PremarketOrderCreateWithoutOfferInput, PremarketOrderUncheckedCreateWithoutOfferInput>
  }

  export type PremarketOrderUpdateWithWhereUniqueWithoutOfferInput = {
    where: PremarketOrderWhereUniqueInput
    data: XOR<PremarketOrderUpdateWithoutOfferInput, PremarketOrderUncheckedUpdateWithoutOfferInput>
  }

  export type PremarketOrderUpdateManyWithWhereWithoutOfferInput = {
    where: PremarketOrderScalarWhereInput
    data: XOR<PremarketOrderUpdateManyMutationInput, PremarketOrderUncheckedUpdateManyWithoutOfferInput>
  }

  export type PremarketTokenCreateWithoutOrdersInput = {
    token_addr: string
    name: string
    symbol: string
    website?: string | null
    twitter?: string | null
    telegram?: string | null
    settle_duration: bigint | number
    temp_starts_at?: Date | string | null
    temp_ends_at?: Date | string | null
    settle_started_at?: bigint | number | null
    status?: number
    fa?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offers?: PremarketOfferCreateNestedManyWithoutTokenInput
  }

  export type PremarketTokenUncheckedCreateWithoutOrdersInput = {
    token_addr: string
    name: string
    symbol: string
    website?: string | null
    twitter?: string | null
    telegram?: string | null
    settle_duration: bigint | number
    temp_starts_at?: Date | string | null
    temp_ends_at?: Date | string | null
    settle_started_at?: bigint | number | null
    status?: number
    fa?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offers?: PremarketOfferUncheckedCreateNestedManyWithoutTokenInput
  }

  export type PremarketTokenCreateOrConnectWithoutOrdersInput = {
    where: PremarketTokenWhereUniqueInput
    create: XOR<PremarketTokenCreateWithoutOrdersInput, PremarketTokenUncheckedCreateWithoutOrdersInput>
  }

  export type PremarketOfferCreateWithoutOrdersInput = {
    offer_addr: string
    price: bigint | number
    amount: bigint | number
    is_buy: boolean
    is_full_match: boolean
    created_by: string
    ts: bigint | number
    filled_amount: bigint | number
    is_active?: boolean
    token: PremarketTokenCreateNestedOneWithoutOffersInput
  }

  export type PremarketOfferUncheckedCreateWithoutOrdersInput = {
    offer_addr: string
    token_addr: string
    price: bigint | number
    amount: bigint | number
    is_buy: boolean
    is_full_match: boolean
    created_by: string
    ts: bigint | number
    filled_amount: bigint | number
    is_active?: boolean
  }

  export type PremarketOfferCreateOrConnectWithoutOrdersInput = {
    where: PremarketOfferWhereUniqueInput
    create: XOR<PremarketOfferCreateWithoutOrdersInput, PremarketOfferUncheckedCreateWithoutOrdersInput>
  }

  export type PremarketTokenUpsertWithoutOrdersInput = {
    update: XOR<PremarketTokenUpdateWithoutOrdersInput, PremarketTokenUncheckedUpdateWithoutOrdersInput>
    create: XOR<PremarketTokenCreateWithoutOrdersInput, PremarketTokenUncheckedCreateWithoutOrdersInput>
    where?: PremarketTokenWhereInput
  }

  export type PremarketTokenUpdateToOneWithWhereWithoutOrdersInput = {
    where?: PremarketTokenWhereInput
    data: XOR<PremarketTokenUpdateWithoutOrdersInput, PremarketTokenUncheckedUpdateWithoutOrdersInput>
  }

  export type PremarketTokenUpdateWithoutOrdersInput = {
    token_addr?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    settle_duration?: BigIntFieldUpdateOperationsInput | bigint | number
    temp_starts_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    temp_ends_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settle_started_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: IntFieldUpdateOperationsInput | number
    fa?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offers?: PremarketOfferUpdateManyWithoutTokenNestedInput
  }

  export type PremarketTokenUncheckedUpdateWithoutOrdersInput = {
    token_addr?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    settle_duration?: BigIntFieldUpdateOperationsInput | bigint | number
    temp_starts_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    temp_ends_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settle_started_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: IntFieldUpdateOperationsInput | number
    fa?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offers?: PremarketOfferUncheckedUpdateManyWithoutTokenNestedInput
  }

  export type PremarketOfferUpsertWithoutOrdersInput = {
    update: XOR<PremarketOfferUpdateWithoutOrdersInput, PremarketOfferUncheckedUpdateWithoutOrdersInput>
    create: XOR<PremarketOfferCreateWithoutOrdersInput, PremarketOfferUncheckedCreateWithoutOrdersInput>
    where?: PremarketOfferWhereInput
  }

  export type PremarketOfferUpdateToOneWithWhereWithoutOrdersInput = {
    where?: PremarketOfferWhereInput
    data: XOR<PremarketOfferUpdateWithoutOrdersInput, PremarketOfferUncheckedUpdateWithoutOrdersInput>
  }

  export type PremarketOfferUpdateWithoutOrdersInput = {
    offer_addr?: StringFieldUpdateOperationsInput | string
    price?: BigIntFieldUpdateOperationsInput | bigint | number
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    is_buy?: BoolFieldUpdateOperationsInput | boolean
    is_full_match?: BoolFieldUpdateOperationsInput | boolean
    created_by?: StringFieldUpdateOperationsInput | string
    ts?: BigIntFieldUpdateOperationsInput | bigint | number
    filled_amount?: BigIntFieldUpdateOperationsInput | bigint | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    token?: PremarketTokenUpdateOneRequiredWithoutOffersNestedInput
  }

  export type PremarketOfferUncheckedUpdateWithoutOrdersInput = {
    offer_addr?: StringFieldUpdateOperationsInput | string
    token_addr?: StringFieldUpdateOperationsInput | string
    price?: BigIntFieldUpdateOperationsInput | bigint | number
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    is_buy?: BoolFieldUpdateOperationsInput | boolean
    is_full_match?: BoolFieldUpdateOperationsInput | boolean
    created_by?: StringFieldUpdateOperationsInput | string
    ts?: BigIntFieldUpdateOperationsInput | bigint | number
    filled_amount?: BigIntFieldUpdateOperationsInput | bigint | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PremarketOfferCreateManyTokenInput = {
    offer_addr: string
    price: bigint | number
    amount: bigint | number
    is_buy: boolean
    is_full_match: boolean
    created_by: string
    ts: bigint | number
    filled_amount: bigint | number
    is_active?: boolean
  }

  export type PremarketOrderCreateManyTokenInput = {
    order_addr: string
    offer_addr: string
    buyer: string
    seller: string
    amount: bigint | number
    created_by: string
    ts: bigint | number
    is_settled?: boolean
    is_claimed?: boolean
  }

  export type PremarketOfferUpdateWithoutTokenInput = {
    offer_addr?: StringFieldUpdateOperationsInput | string
    price?: BigIntFieldUpdateOperationsInput | bigint | number
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    is_buy?: BoolFieldUpdateOperationsInput | boolean
    is_full_match?: BoolFieldUpdateOperationsInput | boolean
    created_by?: StringFieldUpdateOperationsInput | string
    ts?: BigIntFieldUpdateOperationsInput | bigint | number
    filled_amount?: BigIntFieldUpdateOperationsInput | bigint | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    orders?: PremarketOrderUpdateManyWithoutOfferNestedInput
  }

  export type PremarketOfferUncheckedUpdateWithoutTokenInput = {
    offer_addr?: StringFieldUpdateOperationsInput | string
    price?: BigIntFieldUpdateOperationsInput | bigint | number
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    is_buy?: BoolFieldUpdateOperationsInput | boolean
    is_full_match?: BoolFieldUpdateOperationsInput | boolean
    created_by?: StringFieldUpdateOperationsInput | string
    ts?: BigIntFieldUpdateOperationsInput | bigint | number
    filled_amount?: BigIntFieldUpdateOperationsInput | bigint | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    orders?: PremarketOrderUncheckedUpdateManyWithoutOfferNestedInput
  }

  export type PremarketOfferUncheckedUpdateManyWithoutTokenInput = {
    offer_addr?: StringFieldUpdateOperationsInput | string
    price?: BigIntFieldUpdateOperationsInput | bigint | number
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    is_buy?: BoolFieldUpdateOperationsInput | boolean
    is_full_match?: BoolFieldUpdateOperationsInput | boolean
    created_by?: StringFieldUpdateOperationsInput | string
    ts?: BigIntFieldUpdateOperationsInput | bigint | number
    filled_amount?: BigIntFieldUpdateOperationsInput | bigint | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PremarketOrderUpdateWithoutTokenInput = {
    order_addr?: StringFieldUpdateOperationsInput | string
    buyer?: StringFieldUpdateOperationsInput | string
    seller?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    created_by?: StringFieldUpdateOperationsInput | string
    ts?: BigIntFieldUpdateOperationsInput | bigint | number
    is_settled?: BoolFieldUpdateOperationsInput | boolean
    is_claimed?: BoolFieldUpdateOperationsInput | boolean
    offer?: PremarketOfferUpdateOneRequiredWithoutOrdersNestedInput
  }

  export type PremarketOrderUncheckedUpdateWithoutTokenInput = {
    order_addr?: StringFieldUpdateOperationsInput | string
    offer_addr?: StringFieldUpdateOperationsInput | string
    buyer?: StringFieldUpdateOperationsInput | string
    seller?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    created_by?: StringFieldUpdateOperationsInput | string
    ts?: BigIntFieldUpdateOperationsInput | bigint | number
    is_settled?: BoolFieldUpdateOperationsInput | boolean
    is_claimed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PremarketOrderUncheckedUpdateManyWithoutTokenInput = {
    order_addr?: StringFieldUpdateOperationsInput | string
    offer_addr?: StringFieldUpdateOperationsInput | string
    buyer?: StringFieldUpdateOperationsInput | string
    seller?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    created_by?: StringFieldUpdateOperationsInput | string
    ts?: BigIntFieldUpdateOperationsInput | bigint | number
    is_settled?: BoolFieldUpdateOperationsInput | boolean
    is_claimed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PremarketOrderCreateManyOfferInput = {
    order_addr: string
    token_addr: string
    buyer: string
    seller: string
    amount: bigint | number
    created_by: string
    ts: bigint | number
    is_settled?: boolean
    is_claimed?: boolean
  }

  export type PremarketOrderUpdateWithoutOfferInput = {
    order_addr?: StringFieldUpdateOperationsInput | string
    buyer?: StringFieldUpdateOperationsInput | string
    seller?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    created_by?: StringFieldUpdateOperationsInput | string
    ts?: BigIntFieldUpdateOperationsInput | bigint | number
    is_settled?: BoolFieldUpdateOperationsInput | boolean
    is_claimed?: BoolFieldUpdateOperationsInput | boolean
    token?: PremarketTokenUpdateOneRequiredWithoutOrdersNestedInput
  }

  export type PremarketOrderUncheckedUpdateWithoutOfferInput = {
    order_addr?: StringFieldUpdateOperationsInput | string
    token_addr?: StringFieldUpdateOperationsInput | string
    buyer?: StringFieldUpdateOperationsInput | string
    seller?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    created_by?: StringFieldUpdateOperationsInput | string
    ts?: BigIntFieldUpdateOperationsInput | bigint | number
    is_settled?: BoolFieldUpdateOperationsInput | boolean
    is_claimed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PremarketOrderUncheckedUpdateManyWithoutOfferInput = {
    order_addr?: StringFieldUpdateOperationsInput | string
    token_addr?: StringFieldUpdateOperationsInput | string
    buyer?: StringFieldUpdateOperationsInput | string
    seller?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    created_by?: StringFieldUpdateOperationsInput | string
    ts?: BigIntFieldUpdateOperationsInput | bigint | number
    is_settled?: BoolFieldUpdateOperationsInput | boolean
    is_claimed?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}