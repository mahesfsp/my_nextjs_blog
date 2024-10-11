import { Schema, model, models } from "mongoose";

const postSchema = new Schema(
  {
    title: String,
    description: String,
    image: String,
    created_at: String,
  },
  { toJSON: { virtuals: true } }
);
postSchema.virtual("short_description").get(function () {
  return this.description.substr(0, 100) + "...";
});
function changeDateformat(date_str) {
  const date = new Date(date_str);
  const months = [
    "January",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[date.getMonth()]} ${date.getDate()},${date.getFullYear()}`;
}
postSchema.virtual("created_at_formatted").get(function () {
  return changeDateformat(this.created_at);
});

const PostModel = models.Post || model("Post", postSchema);

export default PostModel;
