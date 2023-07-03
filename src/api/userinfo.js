import { privateApi } from "./index";

export const userInfo = {
  methods: {
    async getUser() {
      return await privateApi.get("/users/me");
    },
  },
};
