export const dateFormater = {
    methods:{
        formatDate(date) {
            const pureDate = date.split("T")[0].split("-").reverse().join("/")
            const pureHour = date.split("T")[1].split(".")[0]
            return `${pureDate} - ${pureHour}`
        },
        formatDateRes(date) {
            const pureDate = date.split("T")[0].split("-").reverse().join("/")
            const pureHour = date.split("T")[1].split(".")[0]
            const hour = pureHour.split(":")[0]-3
            const min = pureHour.split(":")[1]
            const sec = pureHour.split(":")[2]
            return `${pureDate} - ${hour}:${min}:${sec}`
        },
    }
}