"use strict";
require("reflect-metadata/Reflect");
const Config = require("./config");
const securityConfig = require("./security-config");
const data = require("./mongoose");
const decorators_1 = require('./core/constants/decorators');
const utils_1 = require("./core/metadata/utils");
const principalContext_1 = require('./security/auth/principalContext');
const Utils = require("./core/utils");
const winstonLog_1 = require('./logging/winstonLog');
const di_1 = require('./di');
const express = require("express");
const Enumerable = require('linq');
var Main = require("./core");
var domain = require('domain');
const test = require('./unit-test/services/blogServiceImpl'); // Test Service i.e. BlogService required for testing in Jasmine.
function intiliaze(params) {
    try {
        winstonLog_1.winstonLog.logInfo("+++++++++++++++++++ =======\n +++++++++++ Wroker executed +++++++++++ \n +++++++++++++++++++ =======");
        const app = express();
        Config.Config.ignorePaths = Config.Config.ignorePaths || [];
        Config.Config.ignorePaths.push('**/server.js', '**/worker.js');
        Main(Config, securityConfig, __dirname, data.entityServiceInst);
        data.connect();
        data.generateSchema();
        Main.register(app);
        params.status = Utils.ProcessStatus.success;
        params.message = "Initialized succesfully";
    }
    catch (exc) {
        params.status = Utils.ProcessStatus.failure;
        params.message = "Error found in initialization : " + exc;
    }
    winstonLog_1.winstonLog.logInfo(params.message);
    process.send(params);
}
function execute(params) {
    try {
        winstonLog_1.winstonLog.logInfo('executing child process');
        var d = domain.create();
        d.run(() => {
            utils_1.MetaUtils.childProcessId = process.pid;
            var services = utils_1.MetaUtils.getMetaDataForDecorators([decorators_1.Decorators.SERVICE]);
            var service = Enumerable.from(services).where(x => x.metadata[0].params.serviceName == params.serviceName).select(x => x.metadata[0]).firstOrDefault();
            var serviceName = params.serviceName;
            //Setting up Principal context for the new process.
            var principalContext = params.principalContext;
            for (var i in principalContext) {
                var key = i;
                var val = principalContext[i];
                principalContext_1.PrincipalContext.save(key, val);
            }
            principalContext_1.PrincipalContext.save('workerParams', params);
            winstonLog_1.winstonLog.logInfo('done default properties of principal context');
            if (service) {
                var injectedProp = di_1.Container.resolve(service.params.target);
                winstonLog_1.winstonLog.logInfo('Service instance: ' + injectedProp);
                var methodName = params.servicemethodName;
                winstonLog_1.winstonLog.logInfo("Method Names: " + JSON.stringify(methodName));
                var methodArguments = params.arguments;
                winstonLog_1.winstonLog.logInfo("arugment Names: " + methodArguments);
                try {
                    var ret = injectedProp[methodName].apply(injectedProp, methodArguments);
                    if (Utils.isPromise(ret)) {
                        ret.then(res => {
                            params.message = "Target Method executed";
                            params.status = Utils.ProcessStatus.success;
                            sendMessage(params);
                        }).catch(exc => {
                            params.message = exc;
                            params.status = Utils.ProcessStatus.failure;
                            sendMessage(params);
                        });
                    }
                    else {
                        params.message = "Target Method executed";
                        params.status = Utils.ProcessStatus.success;
                        sendMessage(params);
                    }
                }
                catch (exc) {
                    params.message = exc;
                    params.status = Utils.ProcessStatus.failure;
                    sendMessage(params);
                }
            }
            else {
                params.message = "No service found.";
                params.status = Utils.ProcessStatus.success;
                sendMessage(params);
            }
        });
    }
    catch (exc) {
        params.status = Utils.ProcessStatus.failure;
        params.message = exc;
        sendMessage(params);
    }
}
function sendMessage(params) {
    winstonLog_1.winstonLog.logInfo(params.message);
    process.send(params);
}
process.on('message', function (m) {
    console.log(m);
    var params = m;
    if (params.initialize) {
        console.log('initializing');
        intiliaze(params);
    }
    else {
        console.log('executing');
        execute(params);
    }
});

//# sourceMappingURL=worker.js.map
