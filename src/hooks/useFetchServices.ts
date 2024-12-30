import { useEffect, useState } from "react";

interface ServiceItem {
  count: number;
  name: string;
  price: number;
}

interface DiscountItem {
  name: string;
  rate: number;
}

interface ServiceResponse {
  items?: Record<string, ServiceItem>;
  discounts?: Record<string, DiscountItem>;
}

const useFetchServices = (url: string) => {
  const [data, setData] = useState<ServiceResponse>({
    items: {},
    discounts: {},
  });
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
        setData(data);
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

  return { items: data.items, discounts: data.discounts, loading, error };
};

export default useFetchServices;
