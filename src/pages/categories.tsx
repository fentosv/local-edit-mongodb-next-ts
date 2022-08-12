import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { ConfirmToast } from 'react-confirm-toast';

import Button from '@components/Button';
import CategoriesTable from '@components/CategoriesTable';
import Layout from '@components/Layout';
import Loading from '@components/Loading';
import Section from '@components/Section';

import dbConnect from '@utils/dbConnect';
import { byLength } from '@utils/order';

import CategoryModel from '@models/Category';
import { Category, CategoryModified } from '@types'
import type { GetStaticProps, NextPage } from 'next'

interface CategoryProps {
    categories: Category[];
}

// Add arrayPath prop to the original Category obj.
const addPathArray = (obj: Category[]): CategoryModified[] => {

    const newArray = [] as CategoryModified[]
    const newObj = {} as CategoryModified

    obj.map(el => {
        const { _id, path } = el

        if (path) {
            newObj['pathArray'] = path.split(',').filter(e => e)
        } else {
            newObj['pathArray'] = []
        }
        // We add the _id to complete the path
        newObj['pathArray'].push(_id)

        newArray.push({
            _id,
            path,
            pathArray: newObj.pathArray,
        })
    })
    return newArray;
}


const createTree = (obj: CategoryModified[]) => {

    const clonedObj = [...obj]

    clonedObj.sort(byLength(true))

    var newObj = {}

    clonedObj.forEach(element =>
        element.pathArray.reduce((o, k) => (o[k as keyof typeof o] = o[k as keyof typeof o] || {}), newObj)
    );
    return newObj
}

// Space - charCodeat: 32  \u0020 
// Line feed - charCodeat: 10  \u000A \n 
const drawTree = (obj: { [key: string]: string }): string => {
    const string = JSON.stringify(obj, null, 9)
        .replace(/{|}|"|:|,|/g, '')
        .replace('\n', '')                                  // Removing first \n
        .replace(/(\u000A{1})+(\u0020{1,})$/gm, '')         // Removing blank lines 

    // Number of spaces until first letter
    let blank_counter = 0
    for (let index = 0; index < string.length; index++) {
        if (string.charCodeAt(index) === 32) {
            blank_counter++
        } else {
            break
        }
    }

    // We delete X spaces in every line to remove the tabulation
    const RegEx = new RegExp(`^(\u0020{${blank_counter}})`, 'gm'); // Removing X blanks per line 
    const final_string = string
        .replace(RegEx, '')

    return final_string
}

const Database: NextPage<CategoryProps> = ({ categories }) => {

    const router = useRouter()
    const [isCategories, setCategories] = useState(
        addPathArray(categories)
        // .sort(byLength(true))
    )

    const addSampleData = async () => {
        try {
            await fetch(`/api/category`, {
                method: 'POST',
                body: 'categories'
            })
            router.reload()

        } catch (error) {
            if (error instanceof Error) console.log(error.message);
        }
    }

    const deleteAllData = async () => {

        try {
            await fetch(`/api/category`, {
                method: 'DELETE',
                body: 'categories'
            })
            router.reload()

        } catch (error) {
            if (error instanceof Error) console.log(error.message);
        }

    }

    return (
        <Layout>
            <Head>
                <title>Fentos | Categories </title>
            </Head>

            <Section>

                <h1 className='title'>Categories</h1>
                {
                    //? Categories Tree
                    isCategories.length > 0 &&
                    <>
                        <h2>Tree</h2>
                        <div className={'categories-tree'}>
                            {drawTree(createTree(isCategories))}
                        </div>
                    </>
                }

                {
                    //? No categories title
                    isCategories.length === 0 &&
                    <h3>No categories in your database</h3>
                }
            </Section>

            <Section>
                <CategoriesTable
                    categories={isCategories}
                />

                <div className='button-container'>
                    {
                        //? No categories add data function 
                        isCategories.length === 0 &&

                        <Button
                            onClick={addSampleData}
                            color='purple'
                        >
                            Click to add sample data
                        </Button>
                    }

                    {
                        // Several items 
                        isCategories.length > 0 &&
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
            </Section>
        </Layout >
    )
}

export const getStaticProps: GetStaticProps = async () => {

    await dbConnect()

    /* find all the data in our database Categories*/
    const result = await CategoryModel.find({})

    const categories = result.map((doc) => {
        const post = doc.toObject()
        return post
    })

    return { props: { categories: categories } }

}

export default Database
