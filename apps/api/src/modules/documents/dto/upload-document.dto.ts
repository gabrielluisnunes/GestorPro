import { Transform } from "class-transformer";
import { IsOptional, IsUUID } from "class-validator";

function emptyToUndefined({ value }: { value: unknown }) {
  return value === "" || value === null || value === undefined
    ? undefined
    : value;
}

export class UploadDocumentDto {
  @IsUUID()
  client_id: string;

  @IsOptional()
  @Transform(emptyToUndefined)
  @IsUUID()
  service_id?: string;

  @IsOptional()
  @Transform(emptyToUndefined)
  @IsUUID()
  contract_id?: string;
}
