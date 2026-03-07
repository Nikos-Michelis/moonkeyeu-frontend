import { useEffect, useState } from "react";

const useScrollToTop = (behavior="smooth") => {
    const [shouldScrollToTop, setShouldScrollToTop] = useState(false);

    useEffect(() => {
        if (shouldScrollToTop) {
            window.scrollTo({ top: 0, behavior: behavior});
            setShouldScrollToTop(false);
        }
    }, [behavior, shouldScrollToTop]);

    return setShouldScrollToTop;
};

export default useScrollToTop;
