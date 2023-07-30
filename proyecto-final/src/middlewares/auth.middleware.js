export const authMdw = (req, res, next) => {
  console.log({session: req.session});
  if (!req.session?.user) {
    return res.status(401).send({ message: "invalid credentials" })
  }

  return next();
};


