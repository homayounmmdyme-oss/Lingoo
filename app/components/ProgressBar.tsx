const ProgressBar = ({progress} : {progress: number}) => {
    return (
        <div className="sticky top-0 z-10 bg-blue-50/95 backdrop-blur-sm">
            <div className="bg-blue-200 h-5 overflow-hidden shadow-inner">
                <div
                    className="h-full bg-linear-to-r from-blue-500 to-blue-600  transition-all duration-300 relative"
                    style={{ width: `${progress}%` }}
                >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
