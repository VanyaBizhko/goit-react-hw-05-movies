import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";
import styles from './Layout.module.css'


const Layout = () => {
     const location = useLocation();
    const isHomeActive = location.pathname === "/";
    const isMoviesActive = location.pathname.startsWith("/movies");
    return (
       <div>
         <nav>
         <ul className={styles.list}>
           <li className={styles.item}>
           <NavLink  className={`${styles.link} ${isHomeActive ? styles.active : ""}`}  to='/'>Home</NavLink>
           </li>
           <li className={styles.item}>
           <NavLink className={`${styles.link} ${isMoviesActive ? styles.active : ""}`}  to='/movies'>Movies</NavLink>
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