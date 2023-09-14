import {AppLayout} from '@hilla/react-components/AppLayout.js';
import {DrawerToggle} from '@hilla/react-components/DrawerToggle.js';
import {Scroller} from '@hilla/react-components/Scroller.js';
import Placeholder from 'Frontend/components/placeholder/Placeholder.js';
import {Suspense} from 'react';
import {NavLink, Outlet} from 'react-router-dom';

export default function MenuOnLeftLayout() {


    return (
        <AppLayout className="block h-full" primarySection="drawer">

            <Scroller slot="drawer" scroll-direction="vertical">
                <nav>
                    <ul className="list-none pl-m">
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
