import ApartmentsComponent from "@/components/ApartmentsComponent/ApartmentsComponent";

export const metadata = {
  title: "Квартири подобово Daily Rent Kyiv ⭐ оренда квартири Київ",
  description:
    "Оренда квартир подобово або погодинно Київ ⭐ Зняти квартиру на добу, день або ніч ✔️ Безліч варіантів в широкому ціновому діапазоні на Daily Rent Kyiv",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_MAIN_URL}apartments`,
  },
};

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
          name: "Daily Rent - оренда квартири Суми. Квартири подобово.",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": `${process.env.NEXT_PUBLIC_MAIN_URL}apartments`,
          name: "Daily Rent Квартири",
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
