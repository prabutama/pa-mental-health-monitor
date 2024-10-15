import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
    return (
        <nav className="flex mb-4">
            {items.map((item, index) => (
                <div key={index} className="flex items-center">
                    {index > 0 && <span className="mx-2">/</span>}
                    {item.link ? (
                        <Link to={item.link} className="text-blue-600 hover:underline">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-gray-500">{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    );
};

export default Breadcrumb;
