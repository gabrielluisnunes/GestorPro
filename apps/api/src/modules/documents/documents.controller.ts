import { randomUUID } from "crypto";
import { extname } from "path";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { getDocumentsUploadDir } from "../../config/upload-paths";
import { UserEntity } from "../../database/entities/user.entity";
import { CurrentUser } from "../auth/current-user.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { DocumentsService } from "./documents.service";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { UploadDocumentDto } from "./dto/upload-document.dto";

const documentUploadMulterOptions = {
  storage: diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, getDocumentsUploadDir());
    },
    filename: (_req, file, cb) => {
      const ext = extname(file.originalname) || "";
      cb(null, `${randomUUID()}${ext}`);
    },
  }),
  limits: { fileSize: 50 * 1024 * 1024 },
};

@UseGuards(JwtAuthGuard)
@Controller("documents")
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  create(@Body() dto: CreateDocumentDto) {
    return this.documentsService.create(dto);
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file", documentUploadMulterOptions))
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadDocumentDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.documentsService.createFromUploadedFile(user.id, file, body);
  }

  @Get()
  findAll(@CurrentUser() user: UserEntity) {
    return this.documentsService.findAll(user.id);
  }

  @Get(":id")
  findOne(@Param("id") id: string, @CurrentUser() user: UserEntity) {
    return this.documentsService.findOne(id, user.id);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id") id: string, @CurrentUser() user: UserEntity) {
    return this.documentsService.remove(id, user.id);
  }
}
