import React from 'react';
import styles from "./styles.module.scss";


export const LoadingPage = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.loader}></div>
        </div>   
     );
};
