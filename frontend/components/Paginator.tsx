import classNames from 'classnames';
import React from 'react';

const Paginator: React.FC = () => {
  const pageData = [
    {
        page: 1,
        isActive: true
    },
    {
        page: 2,
        isActive: false
    },
    {
        page: 3,
        isActive: false
    },
    {
        page: 4,
        isActive: false
    },
    {
        page: 5,
        isActive: false
    },
  ]  
  return (
    <div className="flex gap-2">
        {
            pageData.map((data) => (
                <div className={classNames("cursor-pointer transition duration-500 hover:bg-black hover:text-white border-black border-solid border-2 py-2 px-4 text-sm", 
                    {
                        'bg-black' : data.isActive,
                        'text-white': data.isActive
                    }
                )}>
                    {data.page}
                </div>
            ))
        }
    </div>
  );
};

export default Paginator;