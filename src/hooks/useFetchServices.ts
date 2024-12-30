import { useEffect, useState } from "react";

interface ServiceItem {
  count: number;
  name: string;
  price: number;
}

type ServiceItems = Record<string, ServiceItem>;

const useFetchServices = (url: string) => {
  const [items, setItems] = useState<ServiceItems>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [url]);

  return { items, loading, error };
};

export default useFetchServices;
