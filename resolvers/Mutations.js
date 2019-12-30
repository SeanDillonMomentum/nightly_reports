const Mutations = {
  async addUser(_, args, { db }) {
    let { user, tables } = args;
    const newUser = await db.nightly_report_users.create({ user });
    let tablesExist = tables && tables.length;
    if (tablesExist) {
      for (tableIndividual of tables) {
        let { table } = tableIndividual;
        await db.nightly_report_auth.create({
          user: newUser.id,
          table
        });
      }
    }
    return newUser;
  },
  async addTable(_, args, { db }) {
    let { table_type } = args;
    const newTable = await db.nightly_report_tables.create({ table_type });
    return newTable;
  },
  async delUser(_, args, { db }) {
    const deletedUser = await db.nightly_report_users.destroy({
      where: {
        id: args.id
      }
    });
    console.log(deletedUser);
    return "Deleted User ";
  },
  async editUserTables(_, args, { db }) {
    let { user, tables } = args;
    await db.nightly_report_auth.destroy({
      where: {
        user
      }
    });
    let fullArr = [];
    for (tableArr of tables) {
      let { table } = tableArr;
      const newUserTables = await db.nightly_report_auth.create({
        user,
        table
      });
      fullArr.push(newUserTables);
    }
    return fullArr;
  },
  async createImReport(_, args, { db }) {
    let { report } = args;
    const newImReport = await db.nightly_im_report.create(report);
    return newImReport;
  },
  async createSaReport(_, args, { db }) {
    let { report } = args;
    const newSaReport = await db.nightly_sa_report.create(report);
    return newSaReport;
  }
};

module.exports = Mutations;
