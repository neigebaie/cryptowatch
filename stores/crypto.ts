import { defineStore } from "pinia";
import { useRuntimeConfig } from "#imports";

export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: number | null;
  last_updated: string;
  sparkline_in_7d: {
    price: number[];
  };
}

export const useCryptoStore = defineStore("crypto", {
  state: () => ({
    cryptos: [] as CryptoData[],
    loading: false,
    error: null,
    lastFetched: null as null | number,
  }),
  actions: {
    async fetchCryptos(forceFetch: boolean = false) {
      const now = Date.now();
      const cacheDuration = 5 * 60 * 1000; // Cache for 5 minutes

      if (
        !forceFetch &&
        this.lastFetched &&
        now - this.lastFetched < cacheDuration
      ) {
        // Use cached data if it's within the cache duration
        // console.log("cached cryptos")
        return;
      }

      // console.log("refetching cryptos")

      this.loading = true;
      this.error = null;
      try {
        const config = useRuntimeConfig();
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&sparkline=true&x_cg_demo_api_key=${config.public.apiKey}`
        );
        this.cryptos = await response.json();
        this.lastFetched = now;
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
