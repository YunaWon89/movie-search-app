"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "antd";

const RESULTS_PER_PAGE = 20;

interface MoviePaginationProps {
  currentPage: number;
  totalResults: number;
}

export default function MoviePagination({ currentPage, totalResults }: MoviePaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/?${params.toString()}`);
  };

  if (totalResults <= RESULTS_PER_PAGE) {
    return null;
  }

  return (
    <Pagination
      current={currentPage}
      total={totalResults}
      pageSize={RESULTS_PER_PAGE}
      showSizeChanger={false}
      onChange={handlePageChange}
      align="center"
      style={{ marginTop: 24 }}
    />
  );
}
