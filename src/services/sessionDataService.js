import http from "../http-common";
class SessionDataService {
  getAll() {
    return http.get("/tutorials");
  }
  get(id) {
    return http.get(`/tutorials/${id}`);
  }
  create(data) {
    return http.post("/tutorials", data);
  }
  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }
  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}
export default new SessionDataService();