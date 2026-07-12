import { Spin } from "antd";

export default function Loading() {
  return (
    <main className="page-container">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Spin size="large" tip="Loading movies..." />
      </div>
    </main>
  );
}
