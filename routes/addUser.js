const router = require("express").Router();
const test = require("../sqlFunc");

router.post("/user/add", async (req, res) => {
  console.log("here");
  let { departmentManager, departmentName, departmentIMG } = req.body;
  let query = `INSERT INTO [departmentsLMS] (departmentManager, departmentName, departmentIMG) VALUES ('${departmentManager}', '${departmentName}', '${departmentIMG}')`;
  try {
    const queryResolve = await test(query);
    res.status(200).send(queryResolve);
  } catch (err) {
    res.status(500).send("An Error Occurred!");
    throw new Error(err);
  }
});

module.exports = router;
