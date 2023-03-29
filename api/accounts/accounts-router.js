const router = require("express").Router();
const accountsModel = require("./accounts-model");
const mw = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
  // KODLAR BURAYA
  try {
    let allAccounts = await accountsModel.getAll();
    res.json(allAccounts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.checkAccountId, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    let existAccount = req.Account;
    res.json(existAccount);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  mw.checkAccountPayload,
  mw.checkAccountNameUnique,
  async (req, res, next) => {
    // KODLAR BURAYA
    try {
      let insertedData = await accountsModel.create(req.body);
      res.status(201).json(insertedData);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  mw.checkAccountPayload,
  mw.checkAccountId,
  mw.checkAccountNameUnique,
  async (req, res, next) => {
    // KODLAR BURAYA
    try {
      let updatedDate = await accountsModel.updateById(req.params.id, req.body);
      res.json(updatedDate);
    } catch (error) {
      next();
    }
  }
);

router.delete("/:id", async (req, res, next) => {
  // KODLAR BURAYA
  try {
    await accountsModel.deleteById(req.params.id);
    res.json(req.Account);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // KODLAR BURAYA
  res.status(err.status || 400).json({
    customMessage: "Bir hata oluştu",
    message: err.message,
  });
});

module.exports = router;
