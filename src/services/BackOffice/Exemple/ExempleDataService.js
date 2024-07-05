import http from "@/http-common";
class ExempleDataService {
    getAll() {
        return http.get("/etapes");
    }
    get(uuid) {
        return http.get(`/etapes/${uuid}`);
    }
    create(data) {
        return http.post("/etapes", data);
    }
    update(uuid, data) {
        return http.put(`/etapes/${uuid}`, data);
    }
    delete(uuid) {
        return http.delete(`/etapes/${uuid}`);
    }
    deleteAll() {
        return http.delete(`/etapes`);
    }
    findByTitle(titre) {
        return http.get(`/etapes?titre=${titre}`);
    }
}
export default new ExempleDataService();