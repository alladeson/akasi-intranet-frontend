import http from "@/http-common";
class MemberDataService {
  getAll() {
    return http.get("/projects");
  }
  show(id) {
    return http.get(`/projects/${id}`);
  }
  showTeams(id){
    return http.get(`projects/teams/${id}`);
  }
  create(data) {
    return http.post("/projects", data);
  }
  update(id, data) {
    return http.put(`/projects/${id}`, data);
  }
  delete(id) {
    return http.delete(`/projects/${id}`);
  }
  // deleteAll() {
  //     return http.delete(`/report`);
  // }
  // findByTitle(titre) {
  //     return http.get(`/report?titre=${titre}`);
  // }
}
export default new MemberDataService();
