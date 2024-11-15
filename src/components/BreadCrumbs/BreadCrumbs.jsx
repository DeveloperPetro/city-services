import styles from './BreadCrumbs.module.scss';


const BreadCrumbs = ({ onClick, title }) => {

    return (
        <div
            className={styles.wrapper}
            onClick={onClick}
        >
            <svg className={styles.backIcon}>
                <use href="../sprite.svg#icon-back" />
            </svg>
            <p>{title}</p>
        </div>
    );
};


export default BreadCrumbs;