"use client";

import { useEffect } from "react";
import { Alert, Button } from "antd";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="page-container">
      <Alert
        type="error"
        showIcon
        message="Couldn't load movies"
        description={error.message || "Something went wrong. Please try again."}
        action={
          <Button danger onClick={reset}>
            Try again
          </Button>
        }
      />
    </main>
  );
}
