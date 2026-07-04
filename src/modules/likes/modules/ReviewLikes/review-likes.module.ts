import { Module } from "@nestjs/common";
import { ReviewLikesController } from "./review-likes.controller";
import { ReviewLikesService } from "./review-likes.service";

@Module({
  controllers: [ReviewLikesController],
  providers: [ReviewLikesService],
  exports: [ReviewLikesService],
})
export class ReviewLikesModule {}