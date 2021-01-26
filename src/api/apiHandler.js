import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

export default {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUserInfo() {
    return service
      .get("/api/user/me")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getOneUser(id) {
    return service
      .get(`/api/user/${id}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getCategories() {
    return service
      .get("/api/category/all")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUsersByCategory(id, sortName) {
    return (
      service
        // request query to send information on a get request axios
        .get(`/api/user/all/bycategory?id_category=${id}&sort_name=${sortName}`)
        // .get("/api/user/all/bycategory", { params: { id_category: id } })
        .then((res) => res.data)
        .catch(errorHandler)
    );
  },

  updateProfile(data) {
    return service
      .patch("/api/user/me", data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  // followUser(idFollower, idToFollow,isFollow) {
  //   const follow = isFollow ? "follow" : "unfollow"
  //   return service
  //     .patch(`/api/user/${follow}/${idFollower}`, idToFollow)
  //     .then((res) => res.data)
  //     .catch(errorHandler);
  // },

  followUser(idFollower, idToFollow) {
    // const follow = isFollow ? "follow" : "unfollow"
    return service
      .patch(`/api/user/follow/${idFollower}`, idToFollow)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  unfollowUser(idFollower, idToFollow) {
    return service
      .patch(`/api/user/unfollow/${idFollower}`, idToFollow)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  showFollowing(following) {
    return service
      .patch(`/api/user/me/followingToShow`, following)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  unshowFollowing(unfollowing) {
    return service
      .patch(`/api/user/me/followingToUnshow`, unfollowing)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  getTrends() {
    return service
      .get(`/api/user/trends`)
      .then((res) => res.data)
      .catch(errorHandler);
  },
};
