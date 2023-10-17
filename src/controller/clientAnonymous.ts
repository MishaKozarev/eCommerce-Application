import {
  ClientBuilder,
  type HttpMiddlewareOptions,
  type AnonymousAuthMiddlewareOptions,
} from "@commercetools/sdk-client-v2";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";

const projectKey: string = "11031986";
const clientId: string = "ki6v1kQbQfNG9Tci_ukXYaIz";
const clientSecret: string = "yzVtPEOAH7dEKRh9Q8_3qWjCTHXo4jv0";
const scopes: string[] = [
  "create_anonymous_token:11031986 manage_my_orders:11031986 manage_my_quote_requests:11031986 view_categories:11031986 manage_my_profile:11031986 manage_products:11031986 manage_customers:11031986 manage_my_quotes:11031986 manage_my_business_units:11031986 manage_orders:11031986 manage_my_shopping_lists:11031986 view_published_products:11031986 manage_my_payments:11031986",
];
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: "https://api.europe-west1.gcp.commercetools.com",
  fetch,
};

class ClientsAnonymous {
  getAnonymousSessionFlowClient() {
    const authMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
      host: "https://auth.europe-west1.gcp.commercetools.com",
      projectKey: projectKey,
      credentials: {
        clientId: clientId,
        clientSecret: clientSecret,
      },
      scopes,
      fetch,
    };
    const ctpClient = new ClientBuilder()
      .withAnonymousSessionFlow(authMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: projectKey,
    });
    return apiRoot;
  }
}
export default ClientsAnonymous;
