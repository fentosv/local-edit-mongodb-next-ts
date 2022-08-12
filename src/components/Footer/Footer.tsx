import React from 'react'

import s from './Footer.module.scss'
import GitHub from '@components/icons/GitHub';

const GitHub_Project_Url = 'https://github.com/fentosv/' + process.env.NEXT_PUBLIC_GITHUB_PROJECT_NAME

function Footer() {
    return (
        <>
            <footer className={s.footer} >
                <div>
                    <h3>Developed by <a target='_blank' href='https://github.com/fentosv' rel='noopener noreferrer'>Fentos</a></h3>
                    <h3>Any issues? <a target='_blank' href={`${GitHub_Project_Url}/issues`} rel='noopener noreferrer'>Report them here</a></h3>
                </div>
                <a target='_blank' href={GitHub_Project_Url} rel='noopener noreferrer'>
                    <GitHub />
                </a>
            </footer>
        </>
    );
}

export default Footer;