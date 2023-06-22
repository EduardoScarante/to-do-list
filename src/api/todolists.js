import { privateApi } from "./index";

export const listApiMixin = {
  methods: {
    async list() {
      return await privateApi.get("/lists");
    },
  },
};
