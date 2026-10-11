import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  if (localStorage.getItem('token')) {
    req = req.clone({
      setHeaders : {token : localStorage.getItem('token')!}
    });
  }
  return next(req); // next take req after edit then pass to server
};
