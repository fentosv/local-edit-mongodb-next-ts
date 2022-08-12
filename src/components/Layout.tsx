import { ReactNode } from 'react';

import Navbar from '@components/Navbar';
import Footer from '@components/Footer';


interface Props {
    children: ReactNode;
    navbarClass?: string;
}

export default function Layout({ children, navbarClass }: Props) {
    return (
        <>
            <Navbar navbarClass={navbarClass} />
            <main className='body'>{children}</main>
            <Footer />
        </>
    )
}
