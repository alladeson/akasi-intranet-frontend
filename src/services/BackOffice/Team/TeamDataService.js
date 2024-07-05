import http from "@/http-common";
class TeamDataService {
  getAll() {
    return http.get("/teams");
  }
  show(id) {
    return http.get(`/teams/${id}`);
  }
  create(data) {
    return http.post("/teams", data);
  }
  update(id, data) {
    return http.put(`/teams/${id}`, data);
  }
  validate(id) {
    return http.post(`/teams/validate/${id}`);
  }
  delete(id) {
    return http.delete(`/teams/${id}`);
  }
  showTeamMember(id) {
    return http.get(`teams/members/${id}`);
  }
  // deleteAll() {
  //     return http.delete(`/report`);
  // }
  // findByTitle(titre) {
  //     return http.get(`/report?titre=${titre}`);
  // }
}
export default new TeamDataService();
