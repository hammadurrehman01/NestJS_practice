import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GoogleOAuthGuard extends AuthGuard('google') {}

//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