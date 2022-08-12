import React from 'react';
import classnames from 'classnames-creator'

import styles from './Loading.module.scss'

// This allows us to use any button-specific props: disabled, type, name, etc
interface Props extends React.HTMLAttributes<HTMLDivElement> {
    color?: 'black' | 'white'
}


export default function Loading({ color, children, ...props }: Props) {

    const classes = classnames(
        styles.spinner,
        {
            [styles['black']]: color === 'black',
            [styles['white']]: color === 'white'
        },
    )

    return (
        <div className={classes}>
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
        </div>
    )
}
