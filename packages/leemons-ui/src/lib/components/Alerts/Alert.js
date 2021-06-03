import React from 'react';
import PropTypes from 'prop-types';

const colors = {
    blueGray: 'bg-blue-gray-500',
    gray: 'bg-gray-500',
    brown: 'bg-brown-500',
    deepOrange: 'bg-deep-orange-500',
    orange: 'bg-orange-500',
    amber: 'bg-amber-500',
    yellow: 'bg-yellow-600',
    lime: 'bg-lime-500',
    lightGreen: 'bg-light-green-500',
    green: 'bg-green-500',
    teal: 'bg-teal-500',
    cyan: 'bg-cyan-500',
    lightBlue: 'bg-light-blue-500',
    blue: 'bg-blue-500',
    indigo: 'bg-indigo-500',
    deepPurple: 'bg-deep-purple-500',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
    red: 'bg-red-500',
};

export default function Alert({ children, color, ...rest }) {
    return (
        <>
            <div
                {...rest}
                className={`flex items-center gap-3 text-white p-4 pr-12 border-0 rounded-lg relative mb-4 ${colors[color]} transition-all duration-300`}
            >
                {children}
            </div>
        </>
    );
}

Alert.defaultProps = {
    color: 'lightBlue',
};

Alert.propTypes = {
    color: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};
