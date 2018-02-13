import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = 'BnfOb9OeKTmCFWOSOHgHRVaVmvUz0IwveD1O88XhDW0XREtGMcfa7dLoa4d1VqRqp9quTVXMJU8--HArp3C91R6ImEfGUcXgFHCdTbzCYtSMH0QCz46ygaZ65mj-fLWsQbSSWoAD05kGNCCWz9Xv5MXBNcmR-5rUug5aQyq12PfNxMdzJXJ21c2W4jG0MKb5T5X0k9tK8yP9aF5F7XBxJOxLknQMEWGbNTlHO2tL-MU-IRktdu2_OM3LEIS4r0iwynIi4uaCsaXiBfMQIr3FPVH0_8MJ1WjiNOoDHRpbtXCA8rLuuJgLNvyfMT9Gi6toDIGBjWcyRxyGG3s4T46zmKqITYAe5eTJtN6pUO65XuKUfHJVbXzYD8xJ5r-ANCy666tFUCN912OeYh9zxxBRkCg8fL1yBXfgfs04TuUSjoo3smLVzeWg3ot8y9kqStZ5IxBdCrrbQDHy6LZXuMxLlQZkWqEn7c6DQP-on6uI06I';

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({ setHeaders: { Authorization: 'Bearer ' + authToken } });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
