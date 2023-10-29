const express = require("express");
const { contactsCtrl } = require("../../controllers");
const {
    validateContact,
    validateId,
    validateAuth,
} = require("../../middlewares");
const { contactSchema } = require("../../models");

const { getAll, getById, add, remove, update, updateStatus } = contactsCtrl;

const router = express.Router();

router.use(validateAuth);

router.get("/", getAll);

router.get("/:contactId", validateId, getById);

router.post("/", validateContact(contactSchema.add), add);

router.delete("/:contactId", validateId, remove);

router.put(
    "/:contactId",
    validateId,
    validateContact(contactSchema.update),
    update
);

router.patch(
    "/:contactId/favorite",
    validateId,
    validateContact(contactSchema.updateStatus),
    updateStatus
);

module.exports = router;
