module.exports = (api) => {
    api.cache(true);
    return {
        babelrcRoots: ["."],
        presets: ["next/babel"]
    };
};
