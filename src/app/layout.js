import "./globals.css";
import { Inter, Crimson_Pro } from "next/font/google";
import Header from "@/components/Header/Header";
import { SiteProvider } from "@/context/SiteContext";
import dynamic from "next/dynamic";
// import CallBtnRound from "@/components/CallBtnRound/CallBtnRound";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font--inter",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font--crimsonPro",
});

const DynamicFooter = dynamic(() => import("@/components/Footer/Footer"));
const DynamicToastProvider = dynamic(() => import("@/context/ToastProvider"));
const DynamicTranslatorProvider = dynamic(() =>
  import("@/translator/i18Provider")
);
const DynamicAuthProvider = dynamic(() =>
  import("@/components/AuthProvider/AuthProvider")
);

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_MAIN_URL),
  title: "Daily Rent Kyiv - оренда квартири Київ. Квартири подобово.",
  description:
    "Київ квартири ⭐ Зняти квартиру Київ ✔️ Оренда квартири Київ 🔑 Квартири подобово 📅 Квартири на день",
  keywords: [
    "Суми квартири",
    "Зняти квартиру суми",
    "Квартири на день",
    "Квартири подобово",
    "Оренда квартири суми",
    "Сумы квартиры",
    "Аренда квартир сумы посуточно",
  ],
  alternates: {
    canonical: process.env.NEXT_PUBLIC_MAIN_URL,
  },
  themeColor: "#373737",
  openGraph: {
    title: "Daily Rent - оренда квартири Суми. Квартири подобово.",
    url: process.env.NEXT_PUBLIC_MAIN_URL,
    description:
      "Суми квартири ⭐ Зняти квартиру Суми ✔️ Оренда квартири Суми 🔑 Квартири подобово 📅 Квартири на день",
    type: "website",
    siteName: "Daily Rent",
    images: [
      {
        url: "/seo_images/opengraph-image-400x300.png",
        type: "image/png",
        width: 400,
        height: 300,
        alt: "Daily Rent",
      },
      {
        url: "/seo_images/twitter-image-800x600.png",
        type: "image/png",
        width: 800,
        height: 600,
        alt: "Daily Rent",
      },
      {
        url: "/seo_images/opengraph-image-1200-630.png",
        type: "image/png",
        width: 1200,
        height: 630,
        alt: "Daily Rent",
      },
    ],
    locale: "uk-UA",
  },
  appLinks: {
    ios: {
      url: process.env.NEXT_PUBLIC_MAIN_URL,
      app_name: "Daily Rent",
    },
    android: {
      url: process.env.NEXT_PUBLIC_MAIN_URL,
      package: process.env.NEXT_PUBLIC_MAIN_URL,
      app_name: "Daily Rent",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Daily Rent",
    url: process.env.NEXT_PUBLIC_MAIN_URL,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+380991930030",
        email: "dailyrent4@gmail.com",
        contactType: "customer service",
      },
      {
        "@type": "ContactPoint",
        telephone: "+380675151939",
        contactType: "customer service",
      },
    ],
    logo: [
      {
        "@type": "ImageObject",
        url: "/seo_images/twitter-image-800x600.png",
        contentUrl: "/seo_images/twitter-image-800x600.png",
        size: "800x600",
        caption: "Daily Rent",
        inLanguage: "uk-UA",
      },
    ],
    keywords:
      "Суми квартири. Зняти квартиру Суми. Оренда квартири Суми. Квартири подобово. Квартири на день",
  };
  return (
    <html lang="uk-UA">
      <body className={`${inter.variable} ${crimsonPro.variable}`}>
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
                {/* <CallBtnRound /> закомментировано на время разработки*/}
                <DynamicFooter />
              </DynamicTranslatorProvider>
            </DynamicAuthProvider>
          </DynamicToastProvider>
        </SiteProvider>
      </body>
    </html>
  );
}
