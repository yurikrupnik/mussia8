const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD
    // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("next/constants");
// const nodeExternals = require("webpack-node-externals");

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = (phase) => {
    // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
    const isDev = phase === PHASE_DEVELOPMENT_SERVER;
    // when `next build` or `npm run build` is used
    const isProd =
        phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== "1";
    // when `next build` or `npm run build` is used
    const isStaging =
        phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === "1";

    console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`); // eslint-disable-line

    // const env = {
    //     RESTURL_SPEAKERS: (() => {
    //         if (isDev) return "http:/6/localhost:3000/api/";
    //         if (isProd) {
    //             return "https://mussia5-next.vercel.app/api";
    //         }
    //         if (isStaging) return "http://localhost:11639";
    //         return "RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)";
    //     })(),
    //     // RESTURL_SESSIONS: (() => {
    //     //     if (isDev) return 'http://localhost:4000/sessions'
    //     //     if (isProd) return 'https://www.siliconvalley-codecamp.com/rest/sessions'
    //     //     if (isStaging) return 'http://localhost:11639'
    //     //     return 'RESTURL_SESSIONS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    //     // })(),
    // };

    // next.config.js object
    return {
        // webpack: (
        //     config,
        //     { buildId, dev, isServer, defaultLoaders, webpack }
        // ) => {
        //     // Important: return the modified config
        //     // console.log("webpack", webpack);
        //     // console.log("config", config);
        //     console.log("buildId", buildId);
        //     // config.externals.push(nodeExternals());
        //     return config;
        // },
        eslint: {
            // Warning: Dangerously allow production builds to successfully complete even if
            // your project has ESLint errors.
            ignoreDuringBuilds: true
        },
        async rewrites() {
            return [
                {
                    source: "/gateway/:path*",
                    basePath: false,
                    // description: "http://0.0.0.0:5000/:path*"
                    destination:
                        "https://aris-ars-j0dquon.uk.gateway.dev/:path*"
                }
            ];
        },
        env: {
            RESTURL_SPEAKERS: (() => {
                if (isDev) return `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/`;
                // if (isDev) return "http://localhost:3000/api/";
                if (isProd) {
                    return `${process.env.NEXT_PUBLIC_VERCEL_URL}/api`;
                }
                if (isStaging) return "http://localhost:11639";
                return "RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)";
            })()
            // RESTURL_SESSIONS: (() => {
            //     if (isDev) return 'http://localhost:4000/sessions'
            //     if (isProd) return 'https://www.siliconvalley-codecamp.com/rest/sessions'
            //     if (isStaging) return 'http://localhost:11639'
            //     return 'RESTURL_SESSIONS:not (isDev,isProd && !isStaging,isProd && isStaging)'
            // })(),
        }
    };
};
