# HyperledgerFabric Wizard Frontend

[Preview](https://luca02fioravanti.github.io/hyperledgerfabricwizard-frontend/#/)

## HFW Server URL

After deploying the server you must edit the `./src/app/_services/interceptor.service.ts` and place the url like below:
```typescript
const update = {
  url: 'http://127.0.0.1:8080' + req.url,
  headers: undefined
};
```
