import React from "react";
import PropTypes from "prop-types";
import {faGears} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
export function SkeletonLoader(
    {
        isPending,
        isFetching,
        isError,
        contentConfig = {
            count: 12
        },
        children
    }) {
    const Component = contentConfig?.component || null;
    if (isFetching || isPending) {
        return (
            <>
                {Array.from({ length: contentConfig?.count ?? 12}).map((_, index) => (
                    Component && (
                        <Component key={index} {...contentConfig?.styles}/>
                    )
                ))}
            </>
        );
    }

    if (isError) {
        return (
            <>
                <div className="flex flex-column padding-block-12 text-center">
                    <FontAwesomeIcon icon={faGears} className="fs-large-800 margin-block-end-6"/>
                    <p>Oops! Something went wrong try again later...</p>
                </div>
            </>
        )
    }

    return <>{children}</>;
}

SkeletonLoader.propTypes = {
    isPending: PropTypes.bool,
    isFetching: PropTypes.bool,
    isError: PropTypes.bool,
    contentConfig: PropTypes.shape({
        component: PropTypes.elementType.isRequired,
        count: PropTypes.number,
        styles: PropTypes.shape({
            wrapper: PropTypes.string,
            img: PropTypes.string
        })
    }).isRequired,
    children: PropTypes.node
};
