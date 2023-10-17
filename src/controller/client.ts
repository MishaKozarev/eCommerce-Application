import {
  ClientBuilder,
  type HttpMiddlewareOptions,
  type AuthMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
} from "@commercetools/sdk-client-v2";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";

const projectKey: string = "11031986";
const clientId: string = "CIcLCYp8NmLcG3BLqsJEgnfL";
const clientSecret: string = "zgFEPUFDwqT8IAmmZmlT-YbhFeQWSPAd";
const scopes: string[] = [
  "view_products:11031986 create_anonymous_token:11031986 manage_my_orders:11031986 manage_my_shopping_lists:11031986 manage_my_quote_requests:11031986 view_categories:11031986 manage_my_profile:11031986 manage_products:11031986 manage_customers:11031986 manage_my_quotes:11031986 manage_my_business_units:11031986 view_published_products:11031986 manage_my_payments:11031986",
];
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: "https://api.europe-west1.gcp.commercetools.com",
  fetch,
};

class Clients {
  getCredentialsFlowClient() {
    const authMiddlewareOptions: AuthMiddlewareOptions = {
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
      .withClientCredentialsFlow(authMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: projectKey,
    });
    return apiRoot;
  }

  getPasswordFlowClient(email: string, login: string) {
    const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
      host: "https://auth.europe-west1.gcp.commercetools.com",
      projectKey: projectKey,
      credentials: {
        clientId: clientId,
        clientSecret: clientSecret,
        user: {
          username: email,
          password: login,
        },
      },
      scopes,
      fetch,
    };
    const ctpClient = new ClientBuilder()
      .withPasswordFlow(passwordAuthMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: projectKey,
    });
    return apiRoot;
  }
}
export default Clients;
