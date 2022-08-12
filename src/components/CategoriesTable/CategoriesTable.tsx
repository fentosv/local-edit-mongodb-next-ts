import React, { useState, useEffect } from 'react';

import classnames from 'classnames-creator'

import styles from './CategoriesTable.module.scss'

import { CategoryModified } from '@types'
import Button from '@components/Button'
import { byLength } from '@utils/order';

interface Props {
    categories: CategoryModified[]
}

export default function CategoriesTable({ categories }: Props) {

    const [isCategories, setisCategories] = useState(categories)
    const [isOrdered, setIsOrdered] = useState(false)
    const [isAscending, setIsAscending] = useState(true)

    const styles_orderButton = classnames(
        styles.button,
        {
            [styles.button_ordered]: isOrdered
        }
    )

    //? Live categories order handling
    useEffect(() => {
        if (isOrdered) {
            const categoriesClone = [...categories]
            setisCategories(categoriesClone.sort(byLength(isAscending)))
        } else {
            setisCategories(categories)
        }
    }, [isOrdered, isAscending, categories]);


    if (categories.length > 0) {

        return (
            <>
                <h2>Table</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Path</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isCategories.map(
                                ({ _id, path }) => (
                                    <tr key={_id}>
                                        <td>{_id}</td>
                                        <td>{path ? path : 'null'}</td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>

                <div className="button-container">
                    <Button
                        onClick={() => setIsOrdered(!isOrdered)}
                        className={styles_orderButton}
                    >
                        {isOrdered ? 'Remove order' : 'Order'}
                    </Button>

                    {
                        isOrdered &&
                        <Button
                            onClick={() => setIsAscending(!isAscending)}
                            color='purple'
                        >
                            {isAscending ? 'Ascending 🔼' : 'Descending 🔽'}
                        </Button>
                    }
                </div>
            </>
        )
    } else {
        return null
    }
}
