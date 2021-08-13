const presets = [
    [
        "@babel/preset-env",
        {
            targets: {
                node: "current"
            }
        }
    ],
    ["@babel/preset-typescript"]
];
// const plugins = [];

module.exports = (api) => {
    api.cache(true);
    return {
        babelrcRoots: ["."],
        presets
    };
};
