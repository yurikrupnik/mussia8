// Change router functionality in case you don't use next.js
import { useRouter as useNextRouter } from "next/router";
import noop from "lodash/noop";

const useRouter = () => {
    const router = useNextRouter();
    if (!router) {
        return { pathname: "", push: noop, replace: noop, back: noop };
    }

    return {
        pathname: router.asPath,
        push: router.push,
        replace: router.replace,
        back: router.back
    };
};

export default useRouter;
