import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import { Item } from '@types'

import Button from '@components/Button';

import 'react-quill/dist/quill.snow.css';
import styles from './Form.module.scss'
import useSWR, { useSWRConfig } from 'swr'

// This allows us to use any button-specific props: disabled, type, name, etc
interface Props {
    formData?: Item,
    forNewBlog?: boolean,
}

interface ErrorType {
    message: string
}

// export default function Form({ text, displayName, arrayNum, mode = 'square', ...props }: Props) {
export default function Form({
    formData = {
        _id: '',
        category: '',
        subcategory: '',
        title: '',
        text: ''
    },
    forNewBlog }: Props) {

    const router = useRouter()
    const { mutate } = useSWRConfig()
    const [message, setMessage] = useState<ErrorType[]>([])

    const [form, setForm] = useState<Item>({
        _id: formData._id ?? '',
        category: formData.category ?? '',
        subcategory: formData.subcategory ?? '',
        title: formData.title ?? '',
        text: formData.text ?? ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { value, name } = e.target

        // Reset de sección cuando se cambia category
        if (name === "category") {
            setForm((prevState) => ({
                ...prevState,
                section: 'none'
            }));
        }

        setForm((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleTextArea = (value: string) => {
        setForm((prevState) => ({
            ...prevState,
            text: value
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (forNewBlog) {
            //add
            postData(form)
        } else {
            //edit
            putData(form)
        }
    }

    const putData = async (form: Item) => {
        const { id } = router.query
        const res = await fetch(`/api/item/${id}`, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(form)
        })

        const data = await res.json()

        if (!data.success) {
            //La key es el campo donde da error (title, category, etc)
            for (const key in data.error.errors) {
                let error = data.error.errors[key]

                setMessage(oldMessage => [
                    ...oldMessage,
                    { message: error.message }
                ])
            }
        } else {
            router.push('/items')
        }
    }

    const postData = async (form: Item) => {
        const res = await fetch('/api/item', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(form)
        })

        const data = await res.json()

        if (data.error) {
            if (data.error.code === 11000) {
                setMessage([{ message: `"${formData._id}" ID already exists. Change it.` }])
            }

            //Key is the field with an error (title, category, etc)
            for (const key in data.error.errors) {

                let error = data.error.errors[key]

                setMessage(oldMessage => [
                    ...oldMessage,
                    { message: error.message }
                ])
            }
        } else {
            // As we use useSWR, we can use mutate to re-render the component
            mutate('/api/item', true)
            router.push('/items')
        }
    }

    const modules = {

        toolbar: [
            [{ header: '1' }, { header: '2' }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' }
            ],
            ['link', 'image', 'video'],
            // ['link', 'image'],
            ['clean']
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    }
    const formats = ['bold', 'italic', 'underline', 'strike', 'blockquote', 'video', 'header', 'link']

    return (
        <form
            className={styles.form_container}
            onSubmit={handleSubmit}>

            <div className={styles.form_item}>
                <label
                    htmlFor="id"
                >
                    ID
                </label>
                <input
                    autoComplete='off'
                    name="id"
                    onChange={handleChange}
                    placeholder='ID...'
                    type="text"
                    value={form._id}
                />
            </div>

            <div className={styles.form_item}>
                <label
                    htmlFor="category"
                >
                    Category
                </label>
                <input
                    autoComplete='off'
                    name="category"
                    onChange={handleChange}
                    placeholder='Category...'
                    type="text"
                    value={form.category}
                />
            </div>

            <div className={styles.form_item}>
                <label
                    htmlFor="subcategory"
                >
                    Subcategory
                </label>
                <input
                    autoComplete='off'
                    name="subcategory"
                    onChange={handleChange}
                    placeholder='Subcategory...'
                    type="text"
                    value={form.subcategory}
                />
            </div>

            <div className={styles.form_item}>
                <label
                    htmlFor="title">Title</label>
                <input
                    autoComplete='off'
                    name="title"
                    onChange={handleChange}
                    placeholder='Title...'
                    type="text"
                    value={form.title}
                />
            </div>

            <div className={styles.form_item}>
                <label
                    htmlFor="text">Item text</label>

                <ReactQuill
                    placeholder='Escribe aquí el contenido del post..'
                    // autoComplete='off'
                    modules={modules}
                    formats={formats}
                    onChange={handleTextArea}
                    theme="snow"
                    value={form.text}
                />

            </div>

            {
                message.map(({ message }) => (
                    <div key={message}>{message}</div>
                ))
            }

            <div className={styles.form_buttons}>
                <Button
                    type='submit'
                >
                    {forNewBlog ? 'Add' : 'Save changes'}
                </Button>

                <Button color='red'>
                    <Link href={forNewBlog ? '/items' : `/item/${formData._id}`}>
                        Volver
                    </Link>
                </Button>
            </div>

        </form >
    )
}


