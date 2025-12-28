const ContentLayout = ({ children }) => {
    return (
        <div className="container flex flex-column" data-type="content" data-overflow="visible">
            {children}
        </div>
    );
}
export default ContentLayout;