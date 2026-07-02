import { MoviesService } from "./movies.service";
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { ApiResponse } from "../../common/interfaces/ApiResponse";
import { MovieResponse } from "./interfaces/MovieResponse";
import { MovieMapper } from "./mappers/movie.mapper";

@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get(":tmdbId")
  async findOne(
    @Param("tmdbId", ParseIntPipe) tmdbId: number
  ): Promise<ApiResponse<MovieResponse>> {
    const movie = await this.moviesService.findOne(tmdbId);
    return {
      message: "Movie successfully searched.",
      data: MovieMapper.toResponse(movie),
    };
  }
}