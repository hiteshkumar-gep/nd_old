"use strict";
let DbConnectionOptions = { server: { poolSize: 20, domainsEnabled: true } };
class Config {
}
Config.DbConnection = "mongodb://localhost:27017/test_nodedata";
Config.DbConnectionOptions = DbConnectionOptions;
Config.basePath = "data";
Config.apiversion = "v1";
Config.ElasticSearchConnection = "http://localhost:9200";
Config.ApplyElasticSearch = false;
Config.ignorePaths = ['server.js'];
Config.internalIgnorePaths = ['gulpfile.js'];
Config.isMultiThreaded = true; // This param is for configuring multi process using worker/ process control attribute..
Config.worker = 'worker.js';
Config.process = 1;
Config.isCacheEnabled = false; // by default caching is false, make it true to enable cahing in your application
exports.Config = Config;
class SqlConfig {
}
SqlConfig.isSqlEnabled = false;
SqlConfig.database = "test";
SqlConfig.username = "sa";
SqlConfig.password = "Apr@2016";
SqlConfig.sequlizeSetting = {
    host: '172.19.101.120',
    dialect: 'mssql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
};
exports.SqlConfig = SqlConfig;
class Security {
}
Security.isAutheticationEnabled = "disabled"; //allowed values: "disabled","enabledWithoutAuthorization","enabledWithAuthorization"
Security.authenticationType = "TokenBased"; //allowed values: "passwordBased","TokenBased"
Security.useFaceBookAuth = false;
exports.Security = Security;
class facebookAuth {
}
facebookAuth.clientID = '11'; // your App ID
facebookAuth.clientSecret = 'aa'; // your App Secret
facebookAuth.callbackURL = 'http://localhost:23548/auth/facebook/callback';
exports.facebookAuth = facebookAuth;

//# sourceMappingURL=config.js.map
