import {api} from "./index.js"

export const authApiMixin = {
    methods:{
        async register(data){
            const res = await api.post("/auth/register", data)
            return res
        }
    }
}