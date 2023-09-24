'use client';
import ButtonFilter from '@/components/share/ButtonFilter/ButtonFilter';
import ButtonToBack from '@/components/share/ButtonToBack/ButtonToBack';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';

export default function OneRoomsLayout({ children }) {
  const router = useRouter();

  return (
    <section className={styles.container}>
      <h1 className="visuallyHidden">OneRooms Appartments</h1>
      <div className={styles.oneRoomBox}>
        <div className={styles.backContainer}>
          <ButtonToBack onGoBack={() => router.back()} />
          <p className={styles.text}>Головна / Апартаменти / Lorem ipsum </p>
        </div>
        <div className={styles.filterContainer}>
          <ButtonFilter />
          <p className={styles.filter}>Filter</p>
        </div>
      </div>
      <div>{children}</div>
    </section>
  );
}