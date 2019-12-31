const Query = {
  async nightlyReportAuth(_, __, { db }) {
    const res = await db.nightly_report_auth.findAll();
    return res;
  },
  async nightlyImReport(_, __, { db }) {
    const res = await db.nightly_im_report.findAll({
      include: [{ model: db.nightly_report_users }]
    });
    return res;
  },
  async nightlySaReport(_, __, { db }) {
    const res = await db.nightly_sa_report.findAll({
      include: [{ model: db.nightly_report_users }]
    });
    return res;
  },
  async allUsers(_, __, { db }) {
    const res = await db.nightly_report_users.findAll({
      include: [
        {
          model: db.nightly_report_tables
        },
        { model: db.nightly_im_report },
        { model: db.nightly_sa_report }
      ]
    });
    return res;
  },
  async allTables(_, __, { db }) {
    const res = await db.nightly_report_tables.findAll();
    return res;
  },
  async imReportsById(_, args, { db }) {
    let { id } = args;
    try {
      const res = await db.nightly_im_report.findAll({
        where: { submittedBy: id },
        include: [{ model: db.nightly_report_users }]
      });
      console.log(res);
      return res;
    } catch (err) {
      throw new Error(err);
    }
  },
  async saReportsById(_, args, { db }) {
    let { id } = args;
    try {
      const res = await db.nightly_sa_report.findAll({
        where: { submittedBy: id },
        include: [{ model: db.nightly_report_users }]
      });
      return res;
    } catch (err) {
      throw new Error(err);
    }
  },
  async findUser(_, args, { db }) {
    let { id, user } = args;
    let res;
    if (id)
      res = await db.nightly_report_users.findOne({
        where: {
          id
        },
        include: [
          { model: db.nightly_report_tables },
          { model: db.nightly_im_report },
          { model: db.nightly_sa_report }
        ]
      });
    else {
      res = await db.nightly_report_users.findOne({
        where: {
          user
        },
        include: [
          { model: db.nightly_report_tables },
          { model: db.nightly_im_report },
          { model: db.nightly_sa_report }
        ]
      });
    }
    return res;
  }
};

module.exports = Query;
