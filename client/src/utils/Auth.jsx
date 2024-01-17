import decode from "jwt-decode";

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn(token) {
    // const token = this.getToken();

    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (error) {
      return false;
    }
  }

  getToken() {
    //retrieves the user token from localStorage
    localStorage.getItem("id_token");
  }

  login(idToken) {
    //saves the user token to localStorage
    localStorage.setItem("id_token", idToken);
    window.location.assign("/home/recents");
  }

  logout() {
    //clears user token from localStorage
    localStorage.removeItem("id_token");
    localStorage.removeItem("uuid");
    //this will reload the page and hence reset the state of the application
    window.location.assign("/home/recents");
  }
}

export default new AuthService();
