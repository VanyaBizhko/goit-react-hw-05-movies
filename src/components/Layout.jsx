import { NavLink, Outlet } from "react-router-dom";
import { Suspense } from "react";
import styles from './Layout.module.css'


const Layout = () => {
    return (
       <div>
         <nav>
         <ul className={styles.list}>
           <li className={styles.item}>
           <NavLink className={styles.link}  to='/'>Home</NavLink>
           </li>
           <li className={styles.item}>
           <NavLink className={styles.link}  to='/movies'>Movies</NavLink>
           </li>
           </ul>
            </nav>
            <main>
                <Suspense fallback={<div>Loading...</div> }>
                    <Outlet />
                </Suspense>
            </main>
       </div>
    )
}
export default Layout;