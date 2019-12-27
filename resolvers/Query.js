const Query = {
  async nightlyReportAuth(parent, args, { db }, info) {
    console.log({ db });
    return db.nightly_report_auth.findAll();
  }
};

module.exports = Query;
