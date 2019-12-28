const Mutations = {
  async addUser(_, args, { db }, info) {
    const newUser = await db.nightly_report_users.create({ user: args.user });
    console.log(newUser.dataValues);
    // const res = await db.nightly_report_auth.findOne({
    //   where: {
    //     user: args.user
    //   }
    // });
    return newUser.dataValues;
  },
  async delUser(_, args, { db }, info) {
    const deletedUser = await db.nightly_report_users.destroy({
      where: {
        id: args.id
      }
    });
    console.log(deletedUser);
    return "Deleted User ";
  }
};

module.exports = Mutations;
