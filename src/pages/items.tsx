import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { ConfirmToast } from 'react-confirm-toast';

import Button from '@components/Button';
import Layout from '@components/Layout';
import Loading from '@components/Loading';
import Section from '@components/Section';

import { getRequest } from '@utils/getRequest';

import type { NextPage, GetStaticProps } from 'next'
import ItemsTable from '@components/ItemsTable';

import { Item } from '@types'
import getItems from '@utils/getItems';
import useSWR, { useSWRConfig } from 'swr'

interface ItemProps {
    data: Item[];
}

const fetcher = async (): Promise<Item[]> => {
    const { data } = await getRequest<Item[]>('/api/item')
    return data
}

const Database: NextPage<ItemProps> = () => {
    const { mutate } = useSWRConfig()
    const router = useRouter()

    const { data, error } = useSWR('/api/item', fetcher, {
        revalidateOnFocus: false,
    })

    const deleteAllData = async () => {
        try {
            await fetch('/api/item', {
                method: 'DELETE',
                body: 'items'
            })
            // As we use useSWR, we can use mutate to re-render the component
            // router.reload()
            mutate('/api/item', true)

        } catch (error) {
            if (error instanceof Error) console.log(error.message);
        }
    }

    const addSampleData = async () => {
        try {
            await fetch('/api/item/sample', {
                method: 'POST',
                body: 'items'
            })
            // As we use useSWR, we can use mutate to re-render the component
            // router.reload()
            mutate('/api/item', true)

        } catch (error) {
            if (error instanceof Error) console.log(error.message);
        }
    }

    return (
        <Layout>
            <Head>
                <title>Fentos | Items </title>
            </Head>

            <Section>

                <h1 className='title'>Items</h1>

                {
                    !error && !data &&
                    <Loading />
                }
                {
                    //? No items title
                    (data && data.length === 0) &&

                    <h3>No items in your database</h3>

                }
                {
                    //? Items table
                    (data && data.length > 0) &&
                    <ItemsTable items={data}></ItemsTable>
                }
            </Section>

            <div className='button-container'>
                {
                    //? No items add data function 
                    (data && data.length === 0) &&

                    <Button
                        onClick={addSampleData}
                        color='purple'
                    >
                        Click to add sample data
                    </Button>
                }
                <Button>
                    <Link href="/item/new">
                        New index
                    </Link>
                </Button>

                {
                    //? Several items 
                    (data && data.length > 0) &&
                    <ConfirmToast
                        customFunction={deleteAllData}
                        message='Do you want to erase this collection?'
                        customConfirm='Confirm'
                        theme='dark'
                    >
                        <Button
                            color='red'
                        >
                            Click to delete all
                        </Button>
                    </ConfirmToast>
                }

            </div>

        </Layout>
    )
}

// Example: SSR with useSWR
export const getStaticProps: GetStaticProps = async () => {
    const items = await getItems()
    return {
        props: {
            fallback: {
                '/api/item': items
            }
        }
    }
}

export default Database
