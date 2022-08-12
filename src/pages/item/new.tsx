import Layout from '@components/Layout';
import Form from '@components/Form';

const NewItem = ({ }) => {

    const test = {
        _id: 'id_test',
        category: 'category_test',
        subcategory: 'subcategory_test',
        title: 'title_test',
        text: 'text test'
    }

    return (
        <Layout>
            <h1>New item</h1>

            <Form
                formData={test}
                forNewBlog={true}
            />
        </Layout>
    )
}

export default NewItem




