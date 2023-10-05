const { User, Favorites } = require("../models");
const { comparePass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const axios = require("axios");
const midtransClient = require("midtrans-client");
const { OAuth2Client } = require("google-auth-library");

require("dotenv").config();

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.create({
        email,
        password,
      });

      res.status(201).json({
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "Email/Password required!" };
      }

      if (!password) {
        throw { name: "Email/Password required!" };
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw { name: "Email or Password is invalid!" };
      }

      const compare = comparePass(password, user.password);

      if (!compare) {
        throw { name: "Email or Password is invalid!" };
      }

      const access_token = signToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async movies(req, res, next) {
    try {
      let { page, search } = req.query;

      search = search || "";
      page = parseInt(page) || 1;

      const { data } = await axios({
        url: "https://api.themoviedb.org/3/movie/now_playing",
        method: "get",
        params: {
          api_key: process.env.API_KEY,
          query: search,
          page: page,
        },
      });

      let nowPlaying = data.results.map((el) => {
        return {
          id: el.id,
          image: "https://image.tmdb.org/t/p/w500" + el.poster_path,
          title: el.title,
          overview: el.overview,
          rating: el.vote_average,
          count: el.vote_count,
          date: el.release_date,
        };
      });

      res.status(200).json(nowPlaying);
    } catch (error) {
      console.log(error, "server");
      next(error);
    }
  }

  static async movieDetail(req, res, next) {
    try {
      const { id } = req.params;

      const { data } = await axios({
        url: `https://api.themoviedb.org/3/movie/${id}`,
        method: "get",
        params: {
          api_key: process.env.API_KEY,
        },
      });

      if (!data) {
        throw { name: "Not found" };
      }

      res.status(200).json({
        id: data.id,
        image: "https://image.tmdb.org/t/p/w500" + data.poster_path,
        title: data.title,
        overview: data.overview,
        rating: parseInt(data.vote_average),
        count: data.vote_count,
        date: data.release_date,
      });
    } catch (error) {
      next(error);
    }
  }

  static async subsription(req, res, next) {
    try {
      await User.update(
        { isSubscribed: true },
        {
          where: {
            id: req.user.id,
          },
        }
      );

      res.status(200).json({
        message: `User with id ${req.user.id} now become subscriber!`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async midtransToken(req, res, next) {
    try {
      const findUser = await User.findByPk(req.user.id);

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id:
            "TRANSACTION_" + Math.floor(1000000 + Math.random() * 9000000),
          gross_amount: 10000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: findUser.email,
        },
      };

      const midtransToken = await snap.createTransaction(parameter);
      res.status(201).json(midtransToken);
    } catch (error) {
      next(error);
    }
  }

  static async favorites(req, res, next) {
    try {
      const favorites = await Favorites.findAll({
        where: {
          userId: req.user.id,
        },
      });

      res.status(200).json(favorites);
    } catch (error) {
      next(error);
    }
  }

  static async postFavorites(req, res, next) {
    try {
      const { MovieId } = req.params;

      // axios => tmdb detail https://api.themoviedb.org/3/movie/{movie_id}
      // favorite.create => key:value => data.key

      const { data } = await axios({
        url: `https://api.themoviedb.org/3/movie/${MovieId}`,
        method: "get",
        params: {
          api_key: process.env.API_KEY,
        },
      });

      const movie = await Favorites.create({
        userId: req.user.id,
        imdbId: data.id,
        image: "https://image.tmdb.org/t/p/w500" + data.poster_path,
        title: data.title,
        overview: data.overview,
        rating: parseInt(data.vote_average),
        count: data.vote_count,
        date: data.release_date,
      });

      res.status(201).json({
        message: `Movie with title ${movie.title} has been added to favorites`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res) {
    try {
      const { credential } = req.headers;

      const client = new OAuth2Client();

      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      console.log(payload);

      const [user, isCreated] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          email: payload.email,
          password: "dari_google",
        },
      });

      const access_token = signToken({
        id: user.id,
      });

      let status = 200;

      if (!isCreated) {
        status = 201;
      }
      res.status(status).json({
        access_token,
        email: user.email,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = Controller;
