import http from "@/http-common";
class RapportDataService {
  getAll() {
    return http.get("/report");
  }
  show(id) {
    return http.get(`/report/${id}`);
  }
  create(data) {
    return http.post("/report", data);
  }
  update(id, data) {
    return http.put(`/report/${id}`, data);
  }
  validate(id) {
    return http.post(`/report/validate/${id}`);
  }
  delete(id) {
    return http.delete(`/report/${id}`);
  }
  // deleteAll() {
  //     return http.delete(`/report`);
  // }
  // findByTitle(titre) {
  //     return http.get(`/report?titre=${titre}`);
  // }
}
export default new RapportDataService();
