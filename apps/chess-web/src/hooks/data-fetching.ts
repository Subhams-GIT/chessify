import { useEffect, useState } from "react";
import { ProjectError } from "@/Components/messages/Error";

interface RequestHeaders {
  [key: string]: string;
}

interface DataProps {
  url: string;
  headers?: RequestHeaders;
}

export default function useData({ url, headers }: DataProps) {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<ProjectError | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url) return;

    setLoading(true);

    fetch(url.startsWith("http") ? url : `http://localhost:3000/${url}`, {
      headers,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Request failed");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        setError(
          new ProjectError({
            name: "CONNECTION_ERROR",
            message: "cannot generate the image",
            cause: err,
          })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url, headers]);

  return { data, error, loading };
}
