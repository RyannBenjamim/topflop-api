import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";

import {
  reviewResponseSelect,
  reviewSummarySelect
} from "./prisma/reviews.selects";

import {
  ReviewResponseFromPrisma,
  ReviewSummaryFromPrisma
} from "./prisma/reviews.types";
import { MoviesService } from "../movies/movies.service";

@Injectable()
export class ReviewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly moviesService: MoviesService
  ) {}

  async create(
    authorId: string,
    createReviewDto: CreateReviewDto
  ): Promise<ReviewResponseFromPrisma> {
    return await this.prisma.$transaction(async (tx) => {
      const review = await tx.review.create({
        data: {
          ...createReviewDto,
          authorId,
        },
        select: reviewResponseSelect,
      });

      await this.moviesService.upsertMetrics(
        createReviewDto.movieTmdbId, 
        createReviewDto.topPercentage
      );

      return review;
    });
  }

  async findAll(): Promise<ReviewSummaryFromPrisma[]> {
    return this.prisma.review.findMany({
      orderBy: { createdAt: "desc" },
      select: reviewSummarySelect,
    });
  }

  async findOne(id: string): Promise<ReviewResponseFromPrisma> {
    return this.prisma.review.findUniqueOrThrow({
      where: { id },
      select: reviewResponseSelect,
    });
  }

  async findByMovie(movieTmdbId: number): Promise<ReviewSummaryFromPrisma[]> {
    return this.prisma.review.findMany({
      where: { movieTmdbId },
      orderBy: { createdAt: "desc" },
      select: reviewSummarySelect,
    });
  }

  async findByAuthor(authorId: string): Promise<ReviewSummaryFromPrisma[]> {
    return this.prisma.review.findMany({
      where: { authorId },
      orderBy: { createdAt: "desc" },
      select: reviewSummarySelect,
    });
  }

  async update(
    id: string,
    updateReviewDto: UpdateReviewDto
  ): Promise<ReviewResponseFromPrisma> {
    return this.prisma.review.update({
      where: { id },
      data: updateReviewDto,
      select: reviewResponseSelect,
    });
  }

  async remove(id: string): Promise<ReviewResponseFromPrisma> {
    return this.prisma.review.delete({
      where: { id },
      select: reviewResponseSelect,
    });
  }
}

