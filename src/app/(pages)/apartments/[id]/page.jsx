import React from "react";
import ApartIdItem from "@/components/ApartIdItem/ApartIdItem";
import { getMetaById } from "@/fetch/serverFetch";
import { cookies } from 'next/headers';


export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.id;
  const product = await getMetaById(id);
  const previousImages = (await parent).openGraph?.images || [];

  const data = {
    ua: {
      title: "Квартири подобово Daily Rent Kyiv - оренда квартири Київ.",
      description: `Зняти квартиру в місті Київ за адресою ${product?.address}`,
      keywords: ["Квартири подобово", "оренда квартири", "Київ", "Daily Rent", "Зняти квартиру"],
    },
    en: {
      title: "Apartments for rent Daily Rent Kyiv - rent an apartment in Kyiv.",
      description: `Rent an apartment in Kyiv at ${product?.address}`,
      keywords: ["Apartments for rent", "Kyiv", "Daily Rent", "apartment for a day", "rent"],
    },
    ru: {
      title: "Квартиры посуточно Daily Rent Kyiv - аренда квартиры Киев - аренда квартиры Киев.",
      description: `Снять квартиру в городе Киев по адресу ${product?.address}`,
      keywords: ["Аренда квартир", "Киев", "посуточно", "Daily Rent", "Квартиры"],
    },
  };

  const language = cookies().get('language')?.value || 'ua';

  const { title, description, keywords } = data[language] || data.ua;


  return {
    title,
    description,
    openGraph: {
      images: [product?.titleImg, ...previousImages],
      type: "website",
      title: "Daily Rent - оренда квартири Київ. Квартири подобово.",
      url: `${process.env.NEXT_PUBLIC_MAIN_URL}apartments/${id}`,
      description:
        "Київ квартири ⭐ Зняти квартиру Київ ✔️ Оренда квартири Київ 🔑 Квартири подобово 📅 Квартири на день",
    },
    keywords,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_MAIN_URL}apartments/${id}`,
    },
  };
}


const ApartId = async ({ params }) => {
  const apartment = await getMetaById(params?.id);

  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": process.env.NEXT_PUBLIC_MAIN_URL,
          name: "Daily Rent Kyiv - оренда квартири Київ. Квартири подобово.",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": `${process.env.NEXT_PUBLIC_MAIN_URL}apartments`,
          name: "Daily Rent Kyiv Квартири",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@id": `${process.env.NEXT_PUBLIC_MAIN_URL}apartments/${apartment?._id}`,
          name: "Daily Rent Kyiv Оренда квартир детальніше",
        },
      },
    ],
  };


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ApartIdItem params={params} />
    </>
  );
};


export default ApartId;