import { Projects, Categories } from "@/components";

type SearchParams = {
  category?: string | null;
}
type Props = {
  searchParams: SearchParams
}

export default async function Home({ searchParams: { category } }: Props) {
  return (
    <section className="flexStart flex-col paddings mb-16">
      <Categories />
      <Projects category={category as string} />

    </section>
  );
}
