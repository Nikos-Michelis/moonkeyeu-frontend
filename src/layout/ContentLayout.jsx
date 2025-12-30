const ContentLayout = (
    {
        children,
        size = "base",
        overflow = "visible",
    }) => {
    return (
        <div className="container flex flex-column" data-type={size} data-overflow={overflow}>
            {children}
        </div>
    );
}
export default ContentLayout;