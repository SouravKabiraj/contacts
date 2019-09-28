import {interfaces} from "inversify-express-utils";
import {User} from "../../user/user.model";
import {Id} from "../../models/id.model";
import {whiteListedApis} from "../../config/api.config";
import {LoggerUtility} from "../../utilities/logger.utility";
import {AuthenticationService} from "./authentication.service";

export class Principal implements interfaces.Principal {
    public details: { token: string, userId: string, url: string, method: string };
    private authenticationService: AuthenticationService;

    public constructor(details: any) {
        this.details = details;
    }

    public async isAuthenticated(): Promise<boolean> {
        const userId = new Id(this.details.userId);
        const user = await this.authenticationService.getUser(this.details.token);
        LoggerUtility.logDebug(JSON.stringify(this.details));
        if (this.isWhiteListedRequest()) {
            return Promise.resolve(true);
        } else {
            if (user._id === userId) {
                return Promise.resolve(true);
            } else {
                return Promise.resolve(false);
            }
        }
    }

    public isResourceOwner(resourceId: any): Promise<boolean> {
        return Promise.resolve(true);
    }

    public isInRole(role: string): Promise<boolean> {
        return Promise.resolve(true);
    }

    public isWhiteListedRequest(): boolean {
        const isWhiteListedRequest = whiteListedApis.some(api => {
            LoggerUtility.logDebug(JSON.stringify(api));
            return (this.details.url === api.url && this.details.method === api.method);
        });
        return !!isWhiteListedRequest;
    }
}
