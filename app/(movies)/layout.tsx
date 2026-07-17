import PageHeader from "@/components/layout/PageHeader";

export default function MoviesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageHeader />
      {children}
    </>
  );
}
