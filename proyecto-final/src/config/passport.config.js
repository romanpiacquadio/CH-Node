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
//const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
  passport.use(
    "jwt", 
    new JWTStrategy(
      {
        //jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // extrae del header Authorization: Bearer token
        jwtFromRequest: (req) => {
          let token = null;
          if (req && req.cookies) {
            token = req.cookies.token; // Reemplaza 'tu_cookie_de_token' con el nombre de tu cookie de token
          }
          return token;
        },
        secretOrKey: SECRET_JWT,
      },
      async (jwtPayload, done) => {
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
        scope: ['user:email']
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          
          let user = await userModel.findOne({ email: profile.emails[0].value });
          
          if (!user) {
            let cart = await cartsService.createCart();

            let addNewUser = {
              first_name: profile._json.name,
              last_name: "",
              email: profile.emails[0].value,
              age: 0,
              password: "",
              cartId: cart.cart._id,
            };
            
            let newUser = await userModel.create(addNewUser);
            
            done(null, newUser);
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