module.exports = {
    module: {
        loaders: [
            { test: /\.coffee$/, loader: "coffee" }
        ]
    },
    entry: "./src/main.coffee",
    output: {
        path: "./dist/",
        filename: "myawesomeproject.js",
        library: "MyAwesomeProject",
        libraryTarget: "umd"
    },
    watch: true,
    watchDelay: 500,
    devtool: 'source-map'
}
