# MEAN stack minimongo serviceworker boilerplate
MEAN stack authentication and minimongo / service worker on Angular6 and AngularMaterial6

service worker installation is at minimal configuration.

Once the user is logged in, the application can work fully deconnected. Sync will be done if server come back alive.
If user logout, he will need access to the server to login again.

fork from leota/MEAN-stack-authentication

## documentation
* https://github.com/mWater/minimongo
* https://golb.hplar.ch/2018/06/workbox-serviceworker-in-angular-project.html



# MEAN-stack-authentication
MEAN stack authentication boilerplate with Angular5 and AngularMaterial2.

## Prerequisites
1. Install [Node.js](https://nodejs.org) and [MongoDB](https://www.mongodb.com)
2. Install Angular CLI: `npm i -g @angular/cli`
3. From project root folder install all the dependencies: `npm i`

## Run
### Development mode
#### If on Windows open cmd prompt and run: `"C:\Program Files\MongoDB\Server\[VERSION]\bin\mongod.exe"`

`npm run dev`: [concurrently](https://github.com/kimmobrunfeldt/concurrently) execute Angular build, TypeScript compiler and Express server.

A window will automatically open at [localhost:4200](http://localhost:4200). Angular and Express files are being watched. Any change automatically creates a new bundle, restart Express server and reload your browser.

### Production mode
`npm run prod`: run the project with a production bundle and AOT compilation listening at [localhost:3000](http://localhost:3000)

## Further help
To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

### Author
* [Leonardo Maglio](https://github.com/leota)
