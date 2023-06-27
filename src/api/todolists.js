import { privateApi } from "./index";

export const listApiMixin = {
  methods: {
    async list() {
      return await privateApi.get("/lists");
    },
    async detailList(id) {
      return await privateApi.get(`/lists/${id}`);
    },
    async createList(title) {
      return await privateApi.post("/lists/new", { title: title });
    },
    async deleteList(id){
      return await privateApi.delete(`/lists/${id}`)
    },
    async editNameList(id, newName){
      return await privateApi.patch(`/lists/${id}`, 
      {
        'title': newName
      })
  }
},
};
