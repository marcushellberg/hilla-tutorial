import {AppLayout} from '@hilla/react-components/AppLayout.js';
import {DrawerToggle} from '@hilla/react-components/DrawerToggle.js';
import {Item} from '@hilla/react-components/Item.js';
import {Scroller} from '@hilla/react-components/Scroller.js';
import Placeholder from 'Frontend/components/placeholder/Placeholder.js';
import {Suspense} from 'react';
import {NavLink, Outlet} from 'react-router-dom';
import css from './MainLayout.module.css';

export default function MenuOnLeftLayout() {


    return (
        <AppLayout className="block h-full" primarySection="drawer">
            <header slot="drawer">
                <h1 className="text-l m-0">My App</h1>
            </header>
            <Scroller slot="drawer" scroll-direction="vertical">
                <nav>
                    <ul className="list-none pl-s">
                        <li><NavLink to="/">Contacts</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                    </ul>
                </nav>
            </Scroller>
            <footer slot="drawer"/>

            <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>
            <h2 slot="navbar" className="text-l m-0">
                Hilla CRM
            </h2>

            <Suspense fallback={<Placeholder/>}>
                <Outlet/>
            </Suspense>
        </AppLayout>
    );
}
