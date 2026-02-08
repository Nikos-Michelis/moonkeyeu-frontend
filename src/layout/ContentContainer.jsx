const ContentContainer = (
    {
        children,
        size = "base",
        overflow = "visible",
        className=""
    }) => {
    return (
        <div className={`${className} container flex flex-column`} data-type={size} data-overflow={overflow}>
            {children}
        </div>
    );
}
export default ContentContainer;