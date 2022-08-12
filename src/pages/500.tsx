import React from 'react'
import Head from 'next/head'

import Layout from '@components/Layout';

import type { NextPage } from 'next'

const ServerError: NextPage = () => {
    return (
        <Layout>
            <Head>
                <title>Fentos | Error 500 </title>
            </Head>
            <h1>Error 500</h1>
        </Layout >
    )
}

export default ServerError
