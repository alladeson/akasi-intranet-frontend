import http from "@/http-common";
class MemberDataService {
  getAll() {
    return http.get("/members");
  }
  show(id) {
    return http.get(`/members/${id}`);
  }
  showTeamMember(id) {
    return http.get(`teams/members/${id}`);
  }
  create(data) {
    return http.post("/members", data);
  }
  update(id, data) {
    return http.put(`/members/${id}`, data);
  }
  validate(id) {
    return http.post(`/members/validate/${id}`);
  }
  delete(id) {
    return http.delete(`/members/${id}`);
  }
  // deleteAll() {
  //     return http.delete(`/report`);
  // }
  // findByTitle(titre) {
  //     return http.get(`/report?titre=${titre}`);
  // }
}
export default new MemberDataService();
