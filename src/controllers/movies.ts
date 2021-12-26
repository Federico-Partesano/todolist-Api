import axios from "axios";
import { Request, Response } from "express";
import { ResponseMovies } from "../module/responseMovie";
export const moviesController = {
  searchMovie: async ({ query: { query } }: Request, res: Response) => {
    console.log("query", query);
    const {
      data: { results: movies },
    }: { data: ResponseMovies } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=68ae5fab2a5639e3730ea5e55c5b867e&page=1&query=${query}`
    );

    res.json(movies);
  },
};
