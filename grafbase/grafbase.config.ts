import { g, auth, config } from "@grafbase/sdk";

//@ts-ignore
const User = g
  .model("User", {
    name: g.string().length({ min: 2 }),
    email: g.string().unique(),
    avatarUrl: g.url(),
    description: g.string().length({ min: 2 }),
    projects: g
      .relation(() => Post)
      .list()
      .optional(),
  })
  .auth((rules) => {
    rules.public().read();
  });

//@ts-ignore
const Post = g
  .model("Post", {
    title: g.string().length({ min: 3 }),
    description: g.string().length({ min: 3 }),
    image: g.url(),
    createdBy: g.relation(() => User),
  })
  .auth((rules) => {
    rules.public().read(), rules.private().create().delete().update();
  });

const jwt = auth.JWT({
  issuer: "grafbase",
  secret: g.env("NEXTAUTH_SECRET"),
});

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private(),
  },
});
