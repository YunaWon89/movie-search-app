"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import debounce from "lodash/debounce";

const DEBOUNCE_DELAY_MS = 500;

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState(searchParams.get("query") ?? "");

  const updateQueryInUrl = useMemo(
    () =>
      debounce((value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value.trim()) {
          params.set("query", value.trim());
        } else {
          params.delete("query");
        }

        params.delete("page");

        router.push(`/?${params.toString()}`);
      }, DEBOUNCE_DELAY_MS),
    [router, searchParams],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    updateQueryInUrl(value);
  };

  return (
    <Input
      allowClear
      size="large"
      placeholder="Type to search..."
      prefix={<SearchOutlined />}
      value={inputValue}
      onChange={handleChange}
    />
  );
}
