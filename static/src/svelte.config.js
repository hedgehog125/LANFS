import adapter from "@sveltejs/adapter-static";

const repoName = "LANFS";
const onRootURL = true;
const buildDir = "../build";

const dev = process.env.NODE_ENV == "development";
const baseURL = dev || onRootURL? "" : `/${repoName}`;


/** @type {import("@sveltejs/kit").Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors	
	kit: {
		appDir: "app",
		paths: {
			base: baseURL
		},

		// hydrate the <div id="svelte"> element in src/app.html
		prerender: {
			default: true
		},
		adapter: adapter({
			pages: buildDir,
			assets: buildDir,
			fallback: null
		})
	}
};

export default config;