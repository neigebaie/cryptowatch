import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as null | { username: string },
    loading: false,
    error: null as null | string,
  }),
  actions: {
    async login(username: string, password: string) {
      this.loading = true;
      this.error = null;
      try {
        // Simulate an API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (username === "user" && password === "password") {
          console.log("Welcome")
          this.user = { username };
        } else {
          console.log("invalid credentials")
          throw new Error("Invalid credentials");
        }
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.user = null;
    },
  },
});
