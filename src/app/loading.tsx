import React from 'react';

const LoadingPage = () => {
    return (
        <div>
            <div className="flex min-h-[70vh] items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="loading loading-spinner text-success">
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default LoadingPage;