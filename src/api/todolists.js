import { privateApi } from "./index";

export const listApiMixin = {
  methods: {
    async list() {
      return await privateApi.get("/lists");
    },
    //inserido em 23/06/23 (Luiz) - início
    async detailList(id) {
      return await privateApi.get(`/lists/${id}`);
    },
    async createList(title) {
      return await privateApi.post("/lists/new", { title: title });
    },
    async deleteList(id){
      return await privateApi.delete(`/lists/${id}`)
    }
    // fim
  },
};
