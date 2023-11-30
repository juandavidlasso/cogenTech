import React from 'react';
import styles from './styles.module.css';

interface Props {}

const Loader: React.FC<Props> = ({}) => {
    return <span className={styles.loader}></span>;
};

export default Loader;
