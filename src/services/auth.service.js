// Axios是一個基於Promise的HTTP客戶端庫，廣泛用於JavaScript和Node.js環境中進行HTTP請求。
// 它提供了簡潔的API來處理各種HTTP操作，並且在處理跨域請求方面有著重要的應用。
//連接react和後端sever api的橋樑
import axios from "axios";
const API_URL = "http://localhost:8080/api/user";

class AuthService {
  //登入
  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }
  //登出
  logout() {
    localStorage.removeItem("user");
  }
  //註冊
  register(username, email, password, role) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      role,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
