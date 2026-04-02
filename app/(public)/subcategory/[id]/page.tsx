import { SubcategoryPageClient } from "@/components/pages/subcategoryPage/SubcategoryPageClient";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SubcategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const sp = await searchParams;

  const str = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;

  return (
    <SubcategoryPageClient
      subCategoryId={id}
      categoryId={str(sp.categoryId)}
      subCategoryName={str(sp.name)}
      categoryName={str(sp.categoryName)}
      categorySlug={str(sp.categorySlug)}
    />
  );
}
