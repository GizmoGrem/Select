# Webpack 3 ES6 React, Redux and Stylus Boilerplate

## Dev server
	
Install node modules

	npm install
	
Start the server

	npm run dev

	

## Production build

To build production ready assets, simply run:

	npm run build
	
This will build a uglified `app-[hash].js` and a minified `app-[hash].css` and automatically create a `index.html` linking these files for you in a `build/` directory.

The `build/` directory is `.gitignore`'d by default, and purged before every build.

