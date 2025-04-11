const cacheService = require("./cacheService");
const UserServices = require("../../services/databaseServices/user.services");

class UserCache {
  constructor() {
    this.usersKey = "users";
  }

  async getAllUser() {
    return await cacheService.getOrSet(
      this.usersKey,
      function () {
        const users = UserServices.findAll({});
        return users;
      },
      3600
    );
  }
  async getUserById(id) {
    const key = `user_${id}`;
    return await cacheService.getOrSet(
      key,
      function () {
        const user = UserServices.findById(id);
        return user;
      },
      2 * 60 // 2 minutes
    );
  }
  invalidateUsers() {
    cacheService.del(this.usersKey);
  }
}

module.exports = new UserCache();
