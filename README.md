# Camview - This is a work in progress!

The goal of this project is to create a AWS powered, Facebook integrated remote camera viewer browser application in Angular 4.

_Still so much things to do..._

## Interesting parts

- Using Material Design in Angular 4
- Implementing Facebook authentication in Angular 4
  - note about the getLoginStatus() cache
- Forcing authentication with route guards in Angular 4
- Using the AWS SDK from the browser
  - add @types/node to devDependencies
- Getting Cognito credentials in Angular 4
- Getting user profile details from Cognito Federated Identity
- Using Signature v4 to signing requests to AWS API Gateway
  - https://github.com/nisaacson/aws-v4-sign-small
  - https://www.npmjs.com/package/request has a `aws` property
- Improve the linting in Angular 4
  - `--format verbose --type-check`
- Login status notifications in Angular 4
  - BehaviorSubject, Observable, using `takeUntil` in component destroy
- Promisify HTTP requests in Angular 4
  - `import 'rxjs/add/operator/toPromise';`
- Build a custom AWS SDK
  - https://sdk.amazonaws.com/builder/js/
- How to parse a URL in Angular 4
  - url-parse service: https://gist.github.com/balassy/f504720eddab30f6f08652770651762b
- Debug DI errors in tests: 
  - ng test -sm=false
- Importing RxJS
  - https://christianliebel.com/2017/07/import-rxjs-correctly/
  - https://cartant.github.io/rxjs-tslint-rules
