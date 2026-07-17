"use client";

import { usePathname, useRouter } from "next/navigation";
import { Tabs } from "antd";

const TAB_ITEMS = [
  { key: "/", label: "Search" },
  { key: "/rated", label: "Rated" },
];

export default function PageHeader() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Tabs centered activeKey={pathname} items={TAB_ITEMS} onChange={(key) => router.push(key)} />
  );
}
