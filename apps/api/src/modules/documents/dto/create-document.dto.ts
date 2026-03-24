import { IsOptional, IsString } from "class-validator";

export class CreateDocumentDto {
  @IsString()
  file_url: string;

  @IsOptional()
  @IsString()
  filename?: string;

  @IsOptional()
  @IsString()
  client_id?: string;

  @IsOptional()
  @IsString()
  service_id?: string;

  @IsOptional()
  @IsString()
  contract_id?: string;
}
