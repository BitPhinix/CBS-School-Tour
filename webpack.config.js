module.exports = {
    entry: {
        vtour : "./src/vtour/vtour.ts",
        index : "./src/index/index.ts"
    },
    output: {
        filename: "[name].bundle.js",
        path: __dirname + "/dist"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    devServer: {
        contentBase: __dirname,
        publicPath: "/dist/",
        port: 8080,
        compress: true,
        stats: "errors-only"
    }
};