"use strict";
class SecurityConfig {
}
SecurityConfig.ResourceAccess = [{
        "name": "blogs",
        "acl": [{ "role": "ROLE_ADMIN", "accessmask": 7 },
            { "role": "ROLE_USER", "accessmask": 1 },
            { "role": "ROLE_AUTHOR", "accessmask": 7 }
        ]
    },
    {
        "name": "comment",
        "acl": [{ "role": "ROLE_ADMIN", "accessmask": 7 },
            { "role": "ROLE_USER", "accessmask": 7 },
            { "role": "ROLE_AUTHOR", "accessmask": 7 }
        ]
    }];
SecurityConfig.tokenSecretkey = 'ericthered';
SecurityConfig.tokenExpiresInMinutes = 2; //2 months
SecurityConfig.issuer = "accounts.examplesoft.com";
SecurityConfig.audience = "yoursite.net";
exports.SecurityConfig = SecurityConfig;
(function (AccessMask) {
    AccessMask[AccessMask["view"] = 1] = "view";
    AccessMask[AccessMask["edit"] = 2] = "edit";
    AccessMask[AccessMask["delete"] = 4] = "delete";
    AccessMask[AccessMask["approve"] = 8] = "approve";
})(exports.AccessMask || (exports.AccessMask = {}));
var AccessMask = exports.AccessMask;
;
(function (RoleEnum) {
    RoleEnum[RoleEnum["ROLE_ADMIN"] = 1] = "ROLE_ADMIN";
    RoleEnum[RoleEnum["ROLE_USER"] = 2] = "ROLE_USER";
    RoleEnum[RoleEnum["ROLE_AUTHOR"] = 3] = "ROLE_AUTHOR";
    RoleEnum[RoleEnum["ROLE_PUBLISHER"] = 4] = "ROLE_PUBLISHER";
})(exports.RoleEnum || (exports.RoleEnum = {}));
var RoleEnum = exports.RoleEnum;
;
(function (AuthenticationType) {
    AuthenticationType[AuthenticationType["passwordBased"] = 1] = "passwordBased";
    AuthenticationType[AuthenticationType["TokenBased"] = 2] = "TokenBased";
})(exports.AuthenticationType || (exports.AuthenticationType = {}));
var AuthenticationType = exports.AuthenticationType;
;
(function (AuthenticationEnabled) {
    AuthenticationEnabled[AuthenticationEnabled["disabled"] = 1] = "disabled";
    AuthenticationEnabled[AuthenticationEnabled["enabledWithoutAuthorization"] = 2] = "enabledWithoutAuthorization";
    AuthenticationEnabled[AuthenticationEnabled["enabledWithAuthorization"] = 3] = "enabledWithAuthorization";
})(exports.AuthenticationEnabled || (exports.AuthenticationEnabled = {}));
var AuthenticationEnabled = exports.AuthenticationEnabled;
;

//# sourceMappingURL=security-config.js.map
