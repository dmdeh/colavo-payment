import { useEffect, useState } from "react";
import { DiscountItem, ServiceItem } from "../types/CartType";
import { CurrencyCode } from "../components/Common/PriceFormatter/PriceFormatter";

interface ServiceResponse {
  items: Record<string, ServiceItem>;
  discounts: Record<string, DiscountItem>;
  currency_code: CurrencyCode;
}

const useFetchServices = (url: string) => {
  const [data, setData] = useState<ServiceResponse>({
    items: {},
    discounts: {},
    currency_code: "KRW",
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

  return {
    items: data.items,
    discounts: data.discounts,
    currencyCode: data.currency_code,
    loading,
    error,
  };
};

export default useFetchServices;
