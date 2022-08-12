import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import styles from './ItemsTable.module.scss'

import { ItemTable } from '@types'
import Button from '@components/Button'

import useSWR, { useSWRConfig } from 'swr'

// This allows us to use any button-specific props: disabled, type, name, etc
interface Props {
    items: ItemTable[]
}

export default function CategoriesTable({ items }: Props) {
    const { mutate } = useSWRConfig()
    const [isCategories, setisCategories] = useState(items)
    const [isAscending, setIsAscending] = useState(true)

    const router = useRouter()

    const deleteItem = async (id: string) => {
        await fetch(`/api/item/${id}`, {
            method: 'DELETE',
        })
        // As we use useSWR, we can use mutate to re-render the component
        // router.reload()
        mutate('/api/item', true)
    }



    if (items.length > 0) {

        return (
            <>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Category</th>
                            <th>Subcategory</th>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isCategories.map(
                                ({ _id, category, subcategory, title }) => (
                                    <tr key={_id}>
                                        <td>{_id}</td>
                                        <td>{category}</td>
                                        <td>{subcategory}</td>
                                        <td>{title}</td>
                                        <td>
                                            <Button
                                                color='red'
                                                variant='mini'
                                                onClick={() => deleteItem(_id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                        <td>
                                            <Button
                                                variant='mini'
                                            >
                                                <Link href={`/item/${_id}`} className={styles.default_cursor}>
                                                    <a className={styles.default_cursor}>
                                                        Details
                                                    </a>
                                                </Link>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>

            </>
        )
    } else {
        return null
    }
}
