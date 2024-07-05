import http from "@/http-common";
class DemandeDataService {
  getAll() {
    return http.get("/permission");
  }
  get(id) {
    return http.get(`/permission/${id}`);
  }
  create(data) {
    return http.post("/permission", data);
  }
  update(id, data) {
    return http.post(`/permission/${id}`, data);
  }

  cancel(id) {
    return http.post(`/permission/cancel/${id}`);
  }
  delete(id) {
    return http.delete(`/permission/${id}`);
  }
  // deleteAll() {
  //     return http.delete(`/requesting`);
  // }
  // findByTitle(titre) {
  //     return http.get(`/requesting?titre=${titre}`);
  // }
}
export default new DemandeDataService();
