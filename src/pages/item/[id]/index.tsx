import React from 'react'
import Head from 'next/head'
import { GetServerSideProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';

import dbConnect from '@utils/dbConnect';
import ItemModel from '@models/Item';
import Link from 'next/link'

import Layout from '@components/Layout';
import Button from '@components/Button';

import { Item } from '@types'

interface Params extends ParsedUrlQuery {
    _id: string
}

interface Props {
    data: Item
}

//? If we don't want to type the page:
// export default function Page({ data: { id, userId, title, body } }: Props) { 

//? We can type the page. We can do it like that:
// Option 1
// const Page: NextPage<Props> = ({ data }: Props) => {
// Option 2: More idiomatic
const Page: NextPage<Props> = ({ data: { _id, category, subcategory, title, text } }: Props) => {
    return (
        <Layout>
            <Head>
                <title>{`${_id} - ${title}`}</title>
            </Head>

            <div className="container">

                <h1>Title: {title}</h1>
                <h2>id: {_id}</h2>
                <h3>{category} - {subcategory}</h3>
            </div>

            <p>{text}</p>

            <Button>
                <Link href={`/item/${_id}/edit`}>
                    Edit item
                </Link>
            </Button>
        </Layout>
    );
}

// We type the GSP and then we use it to type the id
export const getServerSideProps: GetServerSideProps<Props, Params> = async (context) => {

    await dbConnect()
    const { id } = context.params as Params

    /* find all the data in our database */
    const item = await ItemModel.findById(id).lean()

    return { props: { data: item } }
}

export default Page