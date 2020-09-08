import http from "../http-common";

class StuffDataService {
  getAll() {
    return http.get("/stuffs");
  }

  get(id) {
    return http.get(`/stuffs/${id}`);
  }

  create(data) {
    return http.post("/stuffs", data);
  }

  update(id, data) {
    return http.put(`/stuffs/${id}`, data);
  }

  delete(id) {
    return http.delete(`/stuffs/${id}`);
  }

  deleteAll() {
    return http.delete(`/stuffs`);
  }

  findByTitle(title) {
    return http.get(`/stuffs?title=${title}`);
  }
}

export default new StuffDataService();
