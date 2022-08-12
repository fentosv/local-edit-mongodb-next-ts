import React from 'react'
import Head from 'next/head'

const GITHUB_PROJECT_NAME = process.env.NEXT_PUBLIC_GITHUB_PROJECT_NAME
const GITHUB_PROJECT_URL = 'https://github.com/fentosv/' + GITHUB_PROJECT_NAME + '/'

import Layout from '@components/Layout';

import type { NextPage } from 'next'
import Section from '@components/Section'



const Database: NextPage = () => {

    const openUrl = (url: string) => {
        window.open(url, '_blank');
    }

    return (
        <Layout>
            <Head>
                <title>Admin </title>
                <meta name="description" content="Panel de administración."></meta>
            </Head>
            <Section>
                <h1 className='title'>
                    Welcome to <a href={GITHUB_PROJECT_URL}>{GITHUB_PROJECT_NAME}</a>!
                </h1>
                <p className='description'>
                    This repository allows you to manage a MongoDB database from localhost.
                </p>
            </Section>

            <Section>
                <h1>
                    Get started!
                </h1>

                <p className='description'>
                    Be sure to fill <code className='code'>.env.local</code> and <code className='code'>.env</code>
                </p>
                <p className='description'>
                    Change what you need in <code className='code'>src/models</code> and <code className='code'>src/types</code>, this is just a sample.
                </p>

            </Section>

            <Section>

                <div className="grid">

                    <a className='card' href={GITHUB_PROJECT_URL + 'tree/main/' + 'src/pages'} target='_blank' rel='noopener noreferrer'>
                        <h3>Next.js & TypeScript </h3>
                        <p>This template is a NextJS with TypeScript working example.</p>
                    </a>

                    <a className='card' href={GITHUB_PROJECT_URL + 'blob/main/' + 'src/pages/items.tsx'} target='_blank' rel='noopener noreferrer'>
                        <h3>Next.js features examples </h3>
                        <p>Examples of Server Side Rendering, dynamic routes, SWR...</p>
                    </a>

                    <a className='card' href={GITHUB_PROJECT_URL + 'blob/main/' + 'src/utils/getItems.ts'} target='_blank' rel='noopener noreferrer'>
                        <h3>Mongoose implementation</h3>
                        <p>Some implementation examples with <em onClick={(e) => openUrl('https://mongoosejs.com/')}>mongoose</em>.</p>
                    </a>

                    <a className='card' href={GITHUB_PROJECT_URL + 'blob/main/' + 'src/pages/categories.tsx'} target='_blank' rel='noopener noreferrer'>
                        <h3>MongoDB visual model tree </h3>
                        <p>Visual render for the <em onClick={(e) => openUrl('https://www.mongodb.com/docs/manual/tutorial/model-tree-structures-with-materialized-paths/')}>Materialize path</em> model tree.</p>
                    </a>

                    <a className='card' href={GITHUB_PROJECT_URL + 'tree/main/' + 'src/components'} target='_blank' rel='noopener noreferrer'>
                        <h3>Variable components </h3>
                        <p>Some working examples of variable function components. </p>
                    </a>

                    <a className='card' href={GITHUB_PROJECT_URL + 'tree/main/' + 'dev'} target='_blank' rel='noopener noreferrer'>
                        <h3>Git automated commands </h3>
                        <p>Github first deploy and update with one command.</p>
                    </a>
                </div>

            </Section>










        </Layout >
    )
}



export default Database
