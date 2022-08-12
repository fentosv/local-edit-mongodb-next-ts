import React from 'react';
import classnames from 'classnames-creator'

import styles from './Button.module.scss'

// This allows us to use any button-specific props: disabled, type, name, etc
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: 'red' | 'purple'
    variant?: 'mini'
}

export default function Button({ color, variant, children, ...props }: Props) {

    const classes = classnames(
        styles.button,
        {
            [styles[color ?? '']]: color,
            [styles['mini']]: variant === 'mini'
        },
    )

    return (

        <button
            className={classes}
            {...props}
        >
            {children}
        </button>

    )
}
