'use client'

import React from 'react'

interface ButtonProps {
    type: "primary" | "warning" | "danger",
    handleClick: () => {}
}

const Button = ({children, type, handleClick}: ButtonProps) => {

    const getType = () => {
        switch (type) {
            case "primary":
                return "bg-indigo-600 hover:bg-indigo-800"
            case "warning":
                return "bg-amber-600 hover:bg-amber-800"
            case "danger":
                return "bg-red-600 hover:bg-red-800"
        }
    }

    return (
        <button
            className={`${getType()} text-white text-md px-4 py-2 rounded-xl transition-all delay-200`}
            onClick={handleClick}
        >
            {children}
        </button>
    )
}

export default Button
