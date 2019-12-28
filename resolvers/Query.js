const Query = {
  async nightlyReportAuth(_, args, { db }, info) {
    console.log({ db });
    const res = await db.nightly_report_auth.findAll();
    return res;
  },
  async nightlyImReport(_, args, { db }, info) {
    const res = await db.nightly_im_report.findAll();
    return res;
  },
  async nightlySaReport(_, args, { db }, info) {
    const res = await db.nightly_sa_report.findAll();
    return res;
  },
  async allUsers(_, args, { db }, info) {
    const res = await db.nightly_report_users.findAll();
    return res;
  },
  async findUser(_, args, { db }, info) {
    const res = await db.nightly_report_users.findOne({
      where: {
        id: args.id
      }
    });
    console.log(res);
    return res;
  },
  async allTables(_, args, { db }, info) {
    const res = await db.nightly_report_tables.findAll();
    return res;
  }
};

module.exports = Query;
