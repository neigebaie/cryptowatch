import { defineStore } from "pinia";
import { useRuntimeConfig } from "#imports";
import { useCryptoStore } from "./crypto";

interface PortfolioCoin {
  id: string;
  amount: number;
}

export const usePortfolioStore = defineStore("portfolio", {
  state: () => ({
    portfolio: { coins: [] as PortfolioCoin[] },
  }),
  getters: {
    netTotal: (state) => {
      const cryptoStore = useCryptoStore();
      let net = 0;
      state.portfolio.coins.forEach((portfolioCoin) => {
        const crypto = cryptoStore.cryptos.find(
          (c) => c.id === portfolioCoin.id
        );
        if (crypto) {
          net += crypto.current_price * portfolioCoin.amount;
        }
      });
      return net;
    },
  },
  actions: {
    async loadPortfolio() {
      if (process.client) {
        const portfolio = localStorage.getItem("portfolio");
        if (portfolio) {
          this.portfolio = JSON.parse(portfolio);
        }
      }
    },
    addCoin(coinId: string, amount: number) {
      if (process.client) {
        const existingCoin = this.portfolio.coins.find((c) => c.id === coinId);
        if (existingCoin) {
          existingCoin.amount += amount;
        } else {
          this.portfolio.coins.push({ id: coinId, amount });
        }
        console.log(this.portfolio)
        localStorage.setItem("portfolio", JSON.stringify(this.portfolio));
      }
    },
    removeCoin(coinId: string) {
      if (process.client) {
        this.portfolio.coins = this.portfolio.coins.filter(
          (c) => c.id !== coinId
        );
        localStorage.setItem("portfolio", JSON.stringify(this.portfolio));
      }
    },
    updateCoinAmount(coinId: string, amount: number) {
      if (process.client) {
        const coin = this.portfolio.coins.find((c) => c.id === coinId);
        if (coin) {
          coin.amount = amount;
          localStorage.setItem("portfolio", JSON.stringify(this.portfolio));
        }
      }
    },
  },
});
