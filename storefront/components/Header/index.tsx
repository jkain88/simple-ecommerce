import React from 'react';

const Index: React.FC = () => {
    return (
        <div className=" bg-primary py-5 text-secondary">
            <div className="mx-14 flex">
                <div className="flex w-full gap-3">
                    <p>Home</p>
                    <p>Search bar</p>
                </div>
                <div className="container flex justify-end gap-3">
                    <p>Cart</p>
                    <p>Login</p>
                </div>
            </div>
        </div>
    );
};

export default Index;
