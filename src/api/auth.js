import { publicApi } from "./index.js";

export const authApiMixin = {
  methods: {
    async register(data) {
      const res = await publicApi.post("/auth/register", data);
      return res;
    },
    async login(data) {
      const res = await publicApi.post("/auth/login", data);
      return res;
    },
  },
};

/* api.interceptors.request.use(( config ) => {
    const token = localStorage.setItem("access_token");
    if(token){
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config
}); */
