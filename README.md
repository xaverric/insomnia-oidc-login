# insomnia-oidc-login

Tool written in node.js to insert login request into the exported collection from the Insomnia REST client. Login request is chained for each request which references following token variables as a Bearer token value.
* ```awidOwnerToken```
* ```asidOwnerToken```
* ```authoritiesToken```
* ```coreSupportToken``` 

## Installation
```npm install```

## How to run

```node index.js [path]```

* **[path]** is path to the directory with workspace export from the Insomnia REST client. 
* After the execution, new files with postfix **_new-auth.json** will be created.
