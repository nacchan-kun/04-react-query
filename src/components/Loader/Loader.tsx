import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <p>Loading...</p> {/* Add a loading message */}
    </div>
  );
};

export default Loader;