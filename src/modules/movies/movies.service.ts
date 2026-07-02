import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";

import { 
  movieResponseSelect, 
  movieMetricsSelect 
} from './prisma/movies.selects'

import {
  MovieResponseFromPrisma,
  MovieMetricsFromPrisma
} from './prisma/movies.types'

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async upsertMetrics(tmdbId: number, rating: number): Promise<MovieMetricsFromPrisma> {
    return await this.prisma.movie.upsert({
      where: { tmdbId },
      update: {
        reviewCount: { increment: 1 },
        topSum: { increment: rating }
      },
      create: {
        tmdbId,
        reviewCount: 1,
        topSum: rating
      },
      select: movieMetricsSelect
    });
  }

  async findOne(tmdbId: number): Promise<MovieResponseFromPrisma> {
    return await this.prisma.movie.findUniqueOrThrow({ 
      where: { tmdbId },
      select: movieResponseSelect
    });
  }
}