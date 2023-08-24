import passport from "passport";

export function handlePolicies(strategy, policies) {
  return (req, res, next) => {
    if(policies.length === 1 & policies[0] === 'PUBLIC') {
      return next();
    }

    passport.authenticate(strategy, (err, user, info) => {
      console.log({err, user, info});
      
      if (err) return next(err);
      
      if (!user) {
        return res.status(401).send({ message: info.messages ? info.message : info.toString() })
      }

      if (policies.includes(user.user.role)) {
        req.user = user;
        return next();
      } else {
        return res.status(403).send({ message: "Access denied. User role not allowed." })
      }

    })(req, res, next)
  }
}


// hadlePolicies('jwt', ['USER'])