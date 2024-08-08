export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    favorites: [] as string[],
  }),
  actions: {
    loadFavorites() {
      if (process.client) {
        const favorites = localStorage.getItem("favorites");
        if (favorites) {
          this.favorites = JSON.parse(favorites);
        }
      }
    },
    addFavorite(newFavorite: string) {
      if (process.client) {
        if (!this.favorites.includes(newFavorite)) {
          this.favorites.push(newFavorite);
          localStorage.setItem("favorites", JSON.stringify(this.favorites));
        }
      }
    },
    removeFavorite(id: string) {
      if (process.client) {
        this.favorites = this.favorites.filter((fav) => fav !== id);
        localStorage.setItem("favorites", JSON.stringify(this.favorites));
      }
    },
    isFavorite(id: string): boolean {
      if (process.client) {
        return this.favorites.includes(id);
      }
    },
  },
});
