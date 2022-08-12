import React, { useState } from 'react'
import Form from '../../../components/Form'
import Layout from '../../../components/common/Layout';
import styles from "../../../styles/Admin.module.css"


import dbConnect from '../../../lib/dbConnect'
import Section from '../../../models/Item';

const New = ({ sections }) => {

    const formData = {
        title_es: '',
        text_es: '',
        title_eng: '',
        text_eng: '',
        date: '',
        category: 'none', //inicializamos en none para que salga la opción disabled
        section: 'none', //inicializamos en none para que salga la opción disabled
        // image: ''
    }

    return (
        <Layout>
            <h1 className={`${styles.page_title}`}>Agregar post</h1>
            <Form formData={formData} sections={sections} />
        </Layout>
    )
}

export default New


export async function getServerSideProps({ params }) {
    try {
        await dbConnect()

        // Esto ya filtra por categoría

        const res_sections = await Section.find({})

        const section_obj = {}
        //Creamos un objeto con formato: 
        // {actualidad: [...secciones], documentos_historicos: [...secciones]}
        for (const section of res_sections) {
            section_obj[section.name] = section.sections
        }

        return {
            props: {
                success: true,
                sections: section_obj,
            }
        }

    } catch (error) {
        console.log(error.message);

        return { props: { success: false, error: error } }
    }
}

