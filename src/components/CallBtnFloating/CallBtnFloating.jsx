"use client";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { socialLinks } from '@/data';
import styles from './CallBtnFloating.module.scss';


const CallBtnFloating = () => {
  const [hidden, setHidden] = useState(false);

  const phoneLink = socialLinks.find(link => link.title === 'Telephone')?.href;

  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      setHidden(isBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <>
      {!isDashboard && <div className={`${styles.callBtn} ${hidden ? styles.hidden : ''}`}>
        <a href={phoneLink}>
          <svg>
            <use href="/sprite.svg#phone-new" />
          </svg>
        </a>
      </div>
      }
    </>
  );
};


export default CallBtnFloating;