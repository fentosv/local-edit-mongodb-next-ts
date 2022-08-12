import { ReactNode } from 'react';
import classnames from 'classnames-creator'

import styles from './Section.module.scss'

interface Props {
    children: ReactNode;
    width?: 'standard' | 'full';
    test?: boolean;
}

// Just for documentation
enum Width {
    standard = '60%',
    full = '100%',
}

export default function Section({ children, test = false, width = 'standard', ...props }: Props) {

    const classes = classnames(
        styles.section,
        styles[width],
        {
            [styles.test]: test
        }
    )

    return (
        <section
            className={classes}
            {...props}
        >
            {children}
        </section>
    )
}
