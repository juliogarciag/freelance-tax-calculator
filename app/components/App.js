import React from 'react';
import styles from 'styles/App.scss';
import TaxCalculator from 'components/TaxCalculator';
import { BrowserRouter, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <div className={styles.appWrapper}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h1 className={styles.title}>Freelance Tax Calculator</h1>
          </div>
          <div className={styles.contentWrapper}>
            <Route path="/" component={TaxCalculator} />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
