/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Address {
  /** ID */
  id?: number;

  /** Address type */
  address_type: "billing" | "shipping";

  /** City area */
  city_area: string;

  /** City */
  city: string;

  /** Province */
  province: string;

  /** Street */
  street?: string;

  /** Postal code */
  postal_code: string;

  /** User */
  user: number;
}

export interface ProductImage {
  /** ID */
  id?: number;

  /**
   * Image
   * @format uri
   */
  image?: string;

  /** Alt */
  alt?: string;

  /** Product */
  product?: number | null;

  /** Variant */
  variant?: number | null;
}

export interface ProductVariant {
  /** ID */
  id?: number;
  images: ProductImage[];

  /** Name */
  name: string;

  /** Product */
  product: number;

  /**
   * Price
   * @format decimal
   */
  price?: string | null;

  /**
   * Quantity
   * @min 0
   * @max 2147483647
   */
  quantity?: number;

  /**
   * Quantity allocated
   * @min 0
   * @max 2147483647
   */
  quantity_allocated?: number;

  /** Sku */
  sku?: string;
}

export interface Product {
  /** ID */
  id?: number;

  /** Name */
  name: string;

  /** Category */
  category?: number | null;

  /** Category name */
  category_name?: string | null;
  images: ProductImage[];

  /**
   * Price
   * @format decimal
   */
  price: string;

  /** Price currency */
  price_currency?: string;

  /** Sku */
  sku?: string;

  /**
   * Quantity
   * @min 0
   * @max 2147483647
   */
  quantity?: number;

  /**
   * Quantity allocated
   * @min 0
   * @max 2147483647
   */
  quantity_allocated?: number;
  variants: ProductVariant[];
}

export interface CheckoutLine {
  /** ID */
  id?: number;

  /**
   * Amount
   * @format decimal
   */
  amount?: string | null;

  /** Checkout */
  checkout: number;

  /** Product */
  product?: number | null;
  product_detail?: Product;

  /** Product variant */
  product_variant?: number | null;
  product_variant_detail?: ProductVariant;

  /**
   * Quantity
   * @min 0
   * @max 2147483647
   */
  quantity?: number;
}

export interface Checkout {
  /** ID */
  id?: number;

  /** Billing address */
  billing_address?: number | null;
  billing_address_detail?: Address;
  lines?: CheckoutLine[];

  /** Shipping address */
  shipping_address?: number | null;
  shipping_address_detail?: Address;

  /**
   * Total amount
   * @format decimal
   */
  total_amount?: string | null;

  /** User */
  user?: number | null;
}

export interface CheckoutComplete {
  /** Checkout */
  checkout: number;
}

export interface OrderLine {
  /** ID */
  id?: number;

  /**
   * Amount
   * @format decimal
   */
  amount?: string | null;

  /** Product */
  product?: number | null;
  product_detail?: Product;

  /** Product variant */
  product_variant?: number | null;
  product_variant_detail?: ProductVariant;

  /**
   * Quantity
   * @min 0
   * @max 2147483647
   */
  quantity?: number;
}

export interface Order {
  /** ID */
  id?: number;

  /** Billing address */
  billing_address?: number | null;
  billing_address_detail?: Address;
  lines?: OrderLine[];

  /** Shipping address */
  shipping_address?: number | null;
  shipping_address_detail?: Address;

  /** Status */
  status?: "pending" | "processing" | "in transit" | "delivered";

  /**
   * Total amount
   * @format decimal
   */
  total_amount?: string | null;

  /** User */
  user?: number | null;
}

export interface Category {
  /** ID */
  id?: number;

  /** Name */
  name: string;

  /** Description */
  description?: string;
}

export interface CustomTokenObtainPair {
  /** Access */
  access?: string;

  /** Refresh */
  refresh?: string;

  /** Email */
  email: string;

  /** Password */
  password: string;
}

export interface TokenRefresh {
  /** Refresh */
  refresh: string;

  /** Access */
  access?: string;
}

export interface User {
  /** ID */
  id?: number;
  addresses?: Address[];

  /**
   * Age
   * @min 0
   * @max 2147483647
   */
  age?: number | null;

  /**
   * Email
   * @format email
   */
  email: string;

  /** First name */
  first_name?: string;

  /** Middle name */
  middle_name?: string;

  /** Last name */
  last_name?: string;

  /** Sex */
  sex?: "male" | "female";
}

export interface UserRegister {
  /** ID */
  id?: number;
  addresses?: Address[];

  /**
   * Age
   * @min 0
   * @max 2147483647
   */
  age?: number | null;

  /**
   * Email
   * @format email
   */
  email: string;

  /** First name */
  first_name?: string;

  /** Middle name */
  middle_name?: string;

  /** Last name */
  last_name?: string;

  /** Sex */
  sex?: "male" | "female";

  /** Password */
  password: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://localhost:8000/api/v1";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Simple Ecommerce API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://localhost:8000/api/v1
 * @contact <torricermartinjosh@gmail.com>
 *
 * Documentation for Simple Ecommerce API
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  checkout = {
    /**
     * No description
     *
     * @tags checkout
     * @name CheckoutRead
     * @request GET:/checkout/
     * @secure
     */
    checkoutRead: (params: RequestParams = {}) =>
      this.request<Checkout, any>({
        path: `/checkout/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create order, order line and delete checkout
     *
     * @tags checkout
     * @name CheckoutCompleteCreate
     * @request POST:/checkout/complete/
     * @secure
     */
    checkoutCompleteCreate: (data: CheckoutComplete, params: RequestParams = {}) =>
      this.request<CheckoutComplete, any>({
        path: `/checkout/complete/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags checkout
     * @name CheckoutCreateCreate
     * @request POST:/checkout/create/
     * @secure
     */
    checkoutCreateCreate: (data: Checkout, params: RequestParams = {}) =>
      this.request<Checkout, any>({
        path: `/checkout/create/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags checkout
     * @name CheckoutLineCreateCreate
     * @request POST:/checkout/line/create/
     * @secure
     */
    checkoutLineCreateCreate: (data: CheckoutLine, params: RequestParams = {}) =>
      this.request<CheckoutLine, any>({
        path: `/checkout/line/create/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags checkout
     * @name CheckoutLineUpdate
     * @request PUT:/checkout/line/{id}
     * @secure
     */
    checkoutLineUpdate: (id: number, data: CheckoutLine, params: RequestParams = {}) =>
      this.request<CheckoutLine, any>({
        path: `/checkout/line/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags checkout
     * @name CheckoutLineDelete
     * @request DELETE:/checkout/line/{id}
     * @secure
     */
    checkoutLineDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/checkout/line/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags checkout
     * @name CheckoutUpdate
     * @request PUT:/checkout/{id}
     * @secure
     */
    checkoutUpdate: (id: number, data: Checkout, params: RequestParams = {}) =>
      this.request<Checkout, any>({
        path: `/checkout/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags checkout
     * @name CheckoutPartialUpdate
     * @request PATCH:/checkout/{id}
     * @secure
     */
    checkoutPartialUpdate: (id: number, data: Checkout, params: RequestParams = {}) =>
      this.request<Checkout, any>({
        path: `/checkout/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  orders = {
    /**
     * No description
     *
     * @tags orders
     * @name OrdersList
     * @request GET:/orders/
     * @secure
     */
    ordersList: (query?: { page?: number }, params: RequestParams = {}) =>
      this.request<{ count: number; next?: string | null; previous?: string | null; results: Order[] }, any>({
        path: `/orders/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrdersRead
     * @request GET:/orders/{id}
     * @secure
     */
    ordersRead: (id: number, params: RequestParams = {}) =>
      this.request<Order, any>({
        path: `/orders/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrdersUpdate
     * @request PUT:/orders/{id}
     * @secure
     */
    ordersUpdate: (id: number, data: Order, params: RequestParams = {}) =>
      this.request<Order, any>({
        path: `/orders/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrdersPartialUpdate
     * @request PATCH:/orders/{id}
     * @secure
     */
    ordersPartialUpdate: (id: number, data: Order, params: RequestParams = {}) =>
      this.request<Order, any>({
        path: `/orders/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrdersDelete
     * @request DELETE:/orders/{id}
     * @secure
     */
    ordersDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  products = {
    /**
     * No description
     *
     * @tags products
     * @name ProductsList
     * @request GET:/products/
     * @secure
     */
    productsList: (query?: { page?: number }, params: RequestParams = {}) =>
      this.request<{ count: number; next?: string | null; previous?: string | null; results: Product[] }, any>({
        path: `/products/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ProductsCategoriesList
     * @request GET:/products/categories
     * @secure
     */
    productsCategoriesList: (query?: { page?: number }, params: RequestParams = {}) =>
      this.request<{ count: number; next?: string | null; previous?: string | null; results: Category[] }, any>({
        path: `/products/categories`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ProductsCategoryCreateCreate
     * @request POST:/products/category/create/
     * @secure
     */
    productsCategoryCreateCreate: (data: Category, params: RequestParams = {}) =>
      this.request<Category, any>({
        path: `/products/category/create/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ProductsCategoryRead
     * @request GET:/products/category/{id}
     * @secure
     */
    productsCategoryRead: (id: number, params: RequestParams = {}) =>
      this.request<Category, any>({
        path: `/products/category/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ProductsCategoryUpdate
     * @request PUT:/products/category/{id}
     * @secure
     */
    productsCategoryUpdate: (id: number, data: Category, params: RequestParams = {}) =>
      this.request<Category, any>({
        path: `/products/category/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ProductsCategoryPartialUpdate
     * @request PATCH:/products/category/{id}
     * @secure
     */
    productsCategoryPartialUpdate: (id: number, data: Category, params: RequestParams = {}) =>
      this.request<Category, any>({
        path: `/products/category/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ProductsCategoryDelete
     * @request DELETE:/products/category/{id}
     * @secure
     */
    productsCategoryDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/products/category/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ProductsCreateCreate
     * @request POST:/products/create/
     * @secure
     */
    productsCreateCreate: (data: Product, params: RequestParams = {}) =>
      this.request<Product, any>({
        path: `/products/create/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ProductsImageCreateCreate
     * @request POST:/products/image/create/
     * @secure
     */
    productsImageCreateCreate: (data: ProductImage, params: RequestParams = {}) =>
      this.request<ProductImage, any>({
        path: `/products/image/create/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ProductsImageRead
     * @request GET:/products/image/{id}
     * @secure
     */
    productsImageRead: (id: number, params: RequestParams = {}) =>
      this.request<ProductImage, any>({
        path: `/products/image/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ProductsImageUpdate
     * @request PUT:/products/image/{id}
     * @secure
     */
    productsImageUpdate: (id: number, data: ProductImage, params: RequestParams = {}) =>
      this.request<ProductImage, any>({
        path: `/products/image/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ProductsImagePartialUpdate
     * @request PATCH:/products/image/{id}
     * @secure
     */
    productsImagePartialUpdate: (id: number, data: ProductImage, params: RequestParams = {}) =>
      this.request<ProductImage, any>({
        path: `/products/image/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ProductsImageDelete
     * @request DELETE:/products/image/{id}
     * @secure
     */
    productsImageDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/products/image/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ProductsVariantCreateCreate
     * @request POST:/products/variant/create/
     * @secure
     */
    productsVariantCreateCreate: (data: ProductVariant, params: RequestParams = {}) =>
      this.request<ProductVariant, any>({
        path: `/products/variant/create/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ProductsVariantRead
     * @request GET:/products/variant/{id}
     * @secure
     */
    productsVariantRead: (id: number, params: RequestParams = {}) =>
      this.request<ProductVariant, any>({
        path: `/products/variant/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ProductsVariantUpdate
     * @request PUT:/products/variant/{id}
     * @secure
     */
    productsVariantUpdate: (id: number, data: ProductVariant, params: RequestParams = {}) =>
      this.request<ProductVariant, any>({
        path: `/products/variant/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ProductsVariantPartialUpdate
     * @request PATCH:/products/variant/{id}
     * @secure
     */
    productsVariantPartialUpdate: (id: number, data: ProductVariant, params: RequestParams = {}) =>
      this.request<ProductVariant, any>({
        path: `/products/variant/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ProductsVariantDelete
     * @request DELETE:/products/variant/{id}
     * @secure
     */
    productsVariantDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/products/variant/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ProductsRead
     * @request GET:/products/{id}
     * @secure
     */
    productsRead: (id: number, params: RequestParams = {}) =>
      this.request<Product, any>({
        path: `/products/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ProductsUpdate
     * @request PUT:/products/{id}
     * @secure
     */
    productsUpdate: (id: number, data: Product, params: RequestParams = {}) =>
      this.request<Product, any>({
        path: `/products/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ProductsPartialUpdate
     * @request PATCH:/products/{id}
     * @secure
     */
    productsPartialUpdate: (id: number, data: Product, params: RequestParams = {}) =>
      this.request<Product, any>({
        path: `/products/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ProductsDelete
     * @request DELETE:/products/{id}
     * @secure
     */
    productsDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/products/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  token = {
    /**
     * No description
     *
     * @tags token
     * @name TokenCreate
     * @request POST:/token/
     * @secure
     */
    tokenCreate: (data: CustomTokenObtainPair, params: RequestParams = {}) =>
      this.request<CustomTokenObtainPair, any>({
        path: `/token/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Takes a refresh type JSON web token and returns an access type JSON web token if the refresh token is valid.
     *
     * @tags token
     * @name TokenRefreshCreate
     * @request POST:/token/refresh/
     * @secure
     */
    tokenRefreshCreate: (data: TokenRefresh, params: RequestParams = {}) =>
      this.request<TokenRefresh, any>({
        path: `/token/refresh/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name UsersList
     * @request GET:/users/
     * @secure
     */
    usersList: (query?: { page?: number }, params: RequestParams = {}) =>
      this.request<{ count: number; next?: string | null; previous?: string | null; results: User[] }, any>({
        path: `/users/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersAddressCreateCreate
     * @request POST:/users/address/create/
     * @secure
     */
    usersAddressCreateCreate: (data: Address, params: RequestParams = {}) =>
      this.request<Address, any>({
        path: `/users/address/create/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersProfileRead
     * @request GET:/users/profile
     * @secure
     */
    usersProfileRead: (params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/profile`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersProfileUpdate
     * @request PUT:/users/profile
     * @secure
     */
    usersProfileUpdate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/profile`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersProfilePartialUpdate
     * @request PATCH:/users/profile
     * @secure
     */
    usersProfilePartialUpdate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/profile`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersRegisterCreate
     * @request POST:/users/register/
     * @secure
     */
    usersRegisterCreate: (data: UserRegister, params: RequestParams = {}) =>
      this.request<UserRegister, any>({
        path: `/users/register/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
