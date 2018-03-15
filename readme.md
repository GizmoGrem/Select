# Webpack 3 ES6 React, Redux and Stylus Boilerplate

## Dev server
	
Install node modules

	npm install
	
Start the server

	npm start
	// Or for Webpack Dashboard
	npm run dev
	

## Production build

To build production ready assets, simply run:

	npm run build
	
This will build a uglified `app-[hash].js` and a minified `app-[hash].css` and automatically create a `index.html` linking these files for you in a `build/` directory.

The `build/` directory is `.gitignore`'d by default, and purged before every build.

## Deployment

We can deploy to [now](https://github.com/zeit/now-cli) ([zeit](https://zeit.co/)) right out the box. Ensure you have the [now-cli](https://www.npmjs.com/package/now) installed globally with npm first.

Edit the `now.json` in the root, change this to the name of your app, then run:

	npm run deploy
	
This will build the production assets and deploy to now. 

To alias your deployment (e.g. `my-app.example.com` or `my-app.now.sh`) supply your `alias` in the `now.json` and run:

	npm run alias
	
Your deployment should now be aliased.

If you want to deploy to now for production also, then you will likely have a slightly different config for production (i.e. a different `alias` pointing to your live domain). There is a supplied `now.production.json` config for this. To deploy/alias to production run:

	npm run deploy-production
	npm run alias-production

## Available commands

- `npm start` - start the dev server
- `npm run clean` - delete the `build` folder
- `npm run lint` - run a eslint check
- `npm test` - run all tests
- `npm run dev` - start the dev server using webpack dashboard
- `npm run build` - create a production ready build in the `build` folder
- `npm run deploy` - deploy the production build to [now](https://github.com/zeit/now-cli)
- `npm run alias` - alias the deployed build on [now](https://github.com/zeit/now-cli)
- `npm run deploy-production` - deploy the production build to a production ready [now](https://github.com/zeit/now-cli) instance
- `npm run alias-production` - alias the deployed build on a production ready [now](https://github.com/zeit/now-cli) instance


# Select
# Select
