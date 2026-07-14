import { Suspense } from "react";
import { Spin } from "antd";
import PageHeader from "@/components/PageHeader";
import RatedResults from "@/components/RatedResults";

interface RatedPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function RatedPage({ searchParams }: RatedPageProps) {
  const params = await searchParams;
  const page = Number(params.page) > 0 ? Number(params.page) : 1;

  return (
    <main className="page-container">
      <PageHeader />

      <Suspense
        key={page}
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "40vh",
            }}
          >
            <Spin size="large" description="Loading rated movies..." />
          </div>
        }
      >
        <RatedResults page={page} />
      </Suspense>
    </main>
  );
}
