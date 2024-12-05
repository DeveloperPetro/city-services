import ApartmentsComponent from "@/components/ApartmentsComponent/ApartmentsComponent";
import { cookies } from 'next/headers';


export async function generateMetadata({ params }) {
  const data = {
    ua: {
      title: "Квартири подобово Daily Rent Kyiv ⭐ оренда квартири Київ",
      description: "Оренда квартир подобово або погодинно Київ ⭐ Зняти квартиру на добу, день або ніч ✔️ Безліч варіантів в широкому ціновому діапазоні на Daily Rent Kyiv",
      keywords: ["Квартири подобово", "оренда квартири", "Київ", "Daily Rent", "Зняти квартиру"],
    },
    en: {
      title: "Apartments for rent Daily Rent Kyiv ⭐ apartment for rent in Kyiv",
      description: "Apartments for rent by the day or by the hour Kyiv ⭐ Rent an apartment for a day, night or week ✔️ Many options in a wide price range on Daily Rent Kyiv.",
      keywords: ["Apartments for rent", "Kyiv", "Daily Rent", "apartment for a day", "rent"],
    },
    ru: {
      title: "Аренда квартир посуточно Киев ⭐ квартиры посуточно в Киеве",
      description: "Аренда квартир посуточно или почасово Киев ⭐ Снять квартиру на сутки, день или ночь ✔️ Множество вариантов в широком ценовом диапазоне на Daily Rent Kyiv.",
      keywords: ["Аренда квартир", "Киев", "посуточно", "Daily Rent", "Квартиры"],
    },
  };

  const language = cookies().get('language')?.value || 'ua';

  const { title, description, keywords } = data[language] || data.ua;


  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_MAIN_URL}apartments`,
    },
  };
}


const Apartments = () => {
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
    ],
  };


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ApartmentsComponent />
    </>
  );
};


export default Apartments;