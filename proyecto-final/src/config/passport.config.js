import passport from 'passport';
import local from 'passport-local';
import { userModel } from '../dao/mongo/models/user.schema.js';
//import { isPasswordValid } from '../helpers/encrypt.js';
import GithubStrategy from 'passport-github2';
import jwt from 'passport-jwt';
import { GITHUB_CLIENT_ID, GITHUB_SECRET_KEY, BASE_URL, SECRET_JWT } from './config.js';
import { cartsService } from '../repositories/index.js';

const LocalStrategy = local.Strategy;

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
  passport.use(
    "jwt", 
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // extrae del header Authorization: Bearer token
        secretOrKey: SECRET_JWT,
      },
      async (jwtPayload, done) => {
        console.log({jwtPayload});
        try {
          return done(null, jwtPayload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_SECRET_KEY,
        callbackURL: `${BASE_URL}/api/session/github/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
          let user = await userModel.findOne({ email: profile._json.email });
  
          if(!user) {
            let newUser = {
              first_name: profile._json.name,
              email: profile._json.email,
              password: '',
            };
            let result = await userModel.create(newUser);
            done(null, result);
  
          } else {
            done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use("register", new LocalStrategy({passReqToCallback: true, usernameField: "email"}, async (req, username, password, done) => {
    const {first_name, last_name, email, age, role} = req.body;

    try {
      let user = await userModel.findOne({ email: username });
      if(user) {
        console.log("User already exists");
        return done(null, false);
      }

      let cart = await cartsService.createCart();

      const newUser = {
        first_name,
        last_name,
        email,
        age,
        password,
        role,
        cartId: cart.cart._id
      }

      let result = await userModel.create(newUser);
      //req.session.user = {...result};
      return done(null, result);
      
    } catch (error) {
      return done("Error while obtaining the user"+ error);
    }
  }))

  // passport.use("login", new LocalStrategy({usernameField: 'email'}, async(username, password, done) => {
  //   try {
  //     const user = await userModel.findOne({email: username});
  //     if(!user) {
  //       console.log("User does not exist");
  //       return done(null, false)
  //     }
  //     if(!isPasswordValid(password, user.password)) return done(null, false)
      
  //     return done(null, user)

  //   } catch (error) {
  //     return done(error);
  //   }
  // }))


  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user)
  });
}

export default initializePassport;