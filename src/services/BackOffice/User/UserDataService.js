import http from "@/http-common";
class UserDataService {
  getAll() {
    return http.get("/users");
  }
  getAllTrashed() {
    return http.get("/users_removed");
  }
  restore(id) {
    return http.post(`/users_restore/${id}`);
  }
  show(id) {
    return http.get(`/users/${id}`);
  }
  create(data) {
    return http.post("/users", data);
  }
  resetPassword(data) {
    return http.post(`auth/reset/password`, data);
  }
  updatePassword(id, data) {
    return http.put(`auth/password/reset/${id}`, data);
  }
  update(id, data) {
    return http.put(`/users/${id}`, data);
  }
  updateProfil(id, data) {
    return http.post(`/users/${id}`, data);
  }
  validate(id) {
    return http.post(`/users/validate/${id}`);
  }
  delete(id) {
    return http.delete(`/users/${id}`);
  }
  // deleteAll() {
  //     return http.delete(`/report`);
  // }
  // findByTitle(titre) {
  //     return http.get(`/report?titre=${titre}`);
  // }
}
export default new UserDataService();
