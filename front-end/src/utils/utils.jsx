export function setUsernameToStorage(username) {
    sessionStorage.setItem("username", username);
}

export function getUsernameFromStorage() {
    let data = sessionStorage.getItem("username");
    return data;
}

export function setJwtToStorage(jwt) {
    sessionStorage.setItem("jwt", jwt);
}

export function getJwtFromStorage() {
    let data = sessionStorage.getItem("jwt");
    return data;
}

export function clearStorage() {
    sessionStorage.clear();
}

export function isAuthenticated() {
    let jwt = getJwtFromStorage();
    return !isEmptyString(jwt);
}

export function isEmptyString(prop) {
    if (prop == null || prop === "") {
      return true;
    } else {
      return false;
    }
  }
