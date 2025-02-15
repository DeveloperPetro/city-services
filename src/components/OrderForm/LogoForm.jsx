import Image from 'next/image';
import { useWindowResize } from '@/hooks/useWindowResize';
import styles from './OrderForm.module.scss';

const LogoForm = () => {
  const { isDesktop } = useWindowResize();

  return (
    <div className={styles.imageWrap}>
      {!isDesktop ? (
        <Image
          src="/logoWhiteSmall.webp"
          alt="Логотип"
          width={85}
          height={32}
        />
      ) : (
        <Image src="/logoWhiteBig.webp" alt="Логотип" width={212} height={56} />
      )}
    </div>
  );
};

export default LogoForm;
