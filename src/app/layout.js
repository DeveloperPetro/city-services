import './globals.scss';
import { Lato, Cormorant_Infant } from 'next/font/google';
import Header from '@/components/Header/Header';
import { SiteProvider } from '@/context/SiteContext';
import dynamic from 'next/dynamic';
import CallBtnFloating from '@/components/CallBtnFloating/CallBtnFloating';
import { GoogleTagManager } from '@next/third-parties/google'

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font--lato',
});

const cormorantInfant = Cormorant_Infant({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font--cormorantInfant',
});

const DynamicFooter = dynamic(() => import('@/components/Footer/Footer'));
const DynamicToastProvider = dynamic(() => import('@/context/ToastProvider'));
const DynamicTranslatorProvider = dynamic(() => import('@/translator/i18Provider'));
const DynamicAuthProvider = dynamic(() => import('@/components/AuthProvider/AuthProvider'));


export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_MAIN_URL),
  title: 'Daily Rent Kyiv - оренда квартири Київ. Квартири подобово.',
  description:
    'Київ квартири ⭐ Зняти квартиру Київ ✔️ Оренда квартири Київ 🔑 Квартири подобово 📅 Квартири на день',
  keywords: [
    'Київ квартири',
    'Зняти квартиру Київ',
    'Квартири на день',
    'Квартири подобово',
    'Оренда квартири Київ',
    'Киев квартиры',
    'Аренда квартир Киев посуточно',
  ],
  alternates: {
    canonical: process.env.NEXT_PUBLIC_MAIN_URL,
  },
  themeColor: '#373737',
  openGraph: {
    title: 'Daily Rent - оренда квартири Київ. Квартири подобово.',
    url: process.env.NEXT_PUBLIC_MAIN_URL,
    description:
      'Київ квартири ⭐ Зняти квартиру Київ ✔️ Оренда квартири Київ 🔑 Квартири подобово 📅 Квартири на день',
    type: 'website',
    siteName: 'Daily Rent',
    images: [
      {
        url: '/seo_images/opengraph-image-400x300.png',
        type: 'image/png',
        width: 400,
        height: 300,
        alt: 'Daily Rent',
      },
      {
        url: '/seo_images/twitter-image-800x600.png',
        type: 'image/png',
        width: 800,
        height: 600,
        alt: 'Daily Rent',
      },
      {
        url: '/seo_images/opengraph-image-1200-630.png',
        type: 'image/png',
        width: 1200,
        height: 630,
        alt: 'Daily Rent',
      },
    ],
    locale: 'uk-UA',
  },
  appLinks: {
    ios: {
      url: process.env.NEXT_PUBLIC_MAIN_URL,
      app_name: 'Daily Rent',
    },
    android: {
      url: process.env.NEXT_PUBLIC_MAIN_URL,
      package: process.env.NEXT_PUBLIC_MAIN_URL,
      app_name: 'Daily Rent',
    },
    web: {
      url: process.env.NEXT_PUBLIC_MAIN_URL,
      should_fallback: true,
    },
  },
  assets: [process.env.NEXT_PUBLIC_MAIN_URL],
  verification: {
    google: process.env.NEXT_PUBLIC_GSC,
  },
};


export default function RootLayout({ children }) {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Daily Rent Kyiv',
    url: process.env.NEXT_PUBLIC_MAIN_URL,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+380954515057',
        contactType: 'customer service',
      },
    ],
    logo: [
      {
        '@type': 'ImageObject',
        url: '/seo_images/twitter-image-800x600.png',
        contentUrl: '/seo_images/twitter-image-800x600.png',
        size: '800x600',
        caption: 'Daily Rent Kyiv',
        inLanguage: 'uk-UA',
      },
    ],
    keywords:
      'Київ квартири. Зняти квартиру Київ. Оренда квартири Київ. Квартири подобово. Квартири на день',
  };
  return (
    <html lang="uk-UA">
      <GoogleTagManager gtmId={`${GTM_ID}`} />
      <body className={`${lato.variable} ${cormorantInfant.variable}`}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteProvider>
          <DynamicToastProvider>
            <DynamicAuthProvider>
              <DynamicTranslatorProvider>
                <Header />
                <main>{children}</main>
                <CallBtnFloating />
                <DynamicFooter />
              </DynamicTranslatorProvider>
            </DynamicAuthProvider>
          </DynamicToastProvider>
        </SiteProvider>
      </body>
    </html>
  );
}