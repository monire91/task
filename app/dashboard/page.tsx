"use client";

import { useAuth } from '@/src/providers/auth';
import styles from './page.module.scss'

const Dashboard = () => {

  const { user } = useAuth();


  return <div className={styles.page}>
    <p className={styles.welcomeText}>Dear {user?.firstName} Welcome to the Dashboard!</p>
  </div>;
};
export default Dashboard;
