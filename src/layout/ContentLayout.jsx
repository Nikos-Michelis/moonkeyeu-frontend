const ContentLayout = ({ children }) => {
    return (
        <div className="container" data-type="full-bleed">
            <div className="container" data-width="fit-content">
                {children}
            </div>
        </div>
    );
}
export default ContentLayout;