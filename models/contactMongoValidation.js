const { Schema } = require("mongoose");
const { model } = require("mongoose");
const { handleSaveError } = require("./hooks");
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", (next) => {
  this.options.runValidators = true;
  next();
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
};
