import { g, auth, config } from "@grafbase/sdk";

const User = g.model("User", {
  name: g.string().length({ min: 2 }),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description: g.string().length({ min: 2 }),
  projects: g
    .relation(() => Post)
    .list()
    .optional(),
});

const Post = g.model("Post", {
  title: g.string().length({ min: 3 }),
  description: g.string().length({ min: 3 }),
  image: g.url(),
  createdBy: g.relation(() => User),
});

export default config({
  schema: g,
});
