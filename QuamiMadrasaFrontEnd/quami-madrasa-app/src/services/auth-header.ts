export default function authHeader() {
    const user_token = JSON.parse(localStorage.getItem('user_token') as string);
    if (user_token && user_token.accessToken) {
      return { Authorization: 'Bearer ' + user_token.accessToken };
    } else {
      return undefined;
    }
  }