import useSWR from 'swr';
import { useRouter } from 'next/router'
import Layout from '@components/Layout';
import Form from '@components/Form';
import { getRequest } from '@utils/getRequest';
import { Item } from '@types'

const EditItem = () => {
    //Sacamos del router el id, que lo lee de [id]
    const router = useRouter()
    const { id } = router.query

    const fetcher = async (url: string): Promise<Item> => {
        const { data } = await getRequest<Item>(url)
        return data
    }

    const { data, error } = useSWR(id ? `/api/item/${id}` : null, fetcher)

    if (error) {
        return (
            <h1>Error</h1>
        )
    }

    if (!data) {
        return (
            <h1>Loading...</h1>
        )
    }

    const formData = {
        _id: data._id,
        category: data.category,
        subcategory: data.subcategory,
        title: data.title,
        text: data.text
    }

    return (
        <Layout>
            <h1>Edit item</h1>

            {JSON.stringify(data)}
            <Form
                forNewBlog={false}
                formData={formData}
            />
        </Layout>
    )
}

export default EditItem




