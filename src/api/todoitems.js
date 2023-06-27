import { privateApi } from "./index";

export const toDoItemsApiMixin = {
  methods: {
    async deleteItem(id) {
      return await privateApi.delete(`/items/${id}`);
    },
    async createItem(listId, title, deadLine) {
      return await privateApi.post("/items/new", 
      {
        "listId": listId,
        "title": title,
        "deadline": deadLine,
      });
    },
    async DetailItem(id) {
        return await privateApi.get(`/items/${id}`);
    },
    async ResolveItem(id){
        console.log(id);
      return await privateApi.patch(`/items/${id}`, {
        "done": true
      })
    }
  },
};
