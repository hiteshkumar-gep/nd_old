"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
const service_1 = require('./di/decorators/service');
const user_1 = require('./security/auth/user');
const inject_1 = require('./di/decorators/inject');
const userRepository_1 = require('./tests/repositories/userRepository');
var userRepo;
let CurrentUserDetailService = class CurrentUserDetailService {
    loadUserByUsername(userName) {
        var usr;
        var userDetail;
        return this.userRepo.findByField("name", userName).then((user) => {
            usr = user;
            if (user == null || user == undefined) {
                return null;
            }
            userDetail = new user_1.User(user.name, user.password, user);
            return userDetail;
        });
    }
    ;
    getNewUser(req, res) {
        var userDetail;
        var user = req.body.user;
        this.userRepo.findByField("name", user.name).then((foundUser) => {
            if (foundUser == null || foundUser == undefined) {
                this.createNewUser(user).then((finalUser) => {
                    res.set("Content-Type", "application/json");
                    res.send(200, JSON.stringify('user created', null, 4));
                }, (error) => {
                    res.set("Content-Type", "application/json");
                    res.send(400, JSON.stringify('cannot create user', null, 4));
                });
            }
            else {
                res.set("Content-Type", "application/json");
                res.send(400, JSON.stringify('user already exists', null, 4));
            }
        });
    }
    ;
    loadUserById(id) {
        var usr;
        var userDetail;
        var _id = id;
        return this.userRepo.findOne(_id).then((user) => {
            usr = user;
            if (user == null || user == undefined) {
                throw 'user doesnot exist';
            }
            userDetail = new user_1.User(user.name, user.password, user);
            return userDetail;
        });
    }
    ;
    loadUserByField(field, value) {
        var usr;
        var userDetail;
        return this.userRepo.findByField(field, value).then((user) => {
            usr = user;
            if (user == null || user == undefined) {
                throw 'user doesnot exist';
            }
            userDetail = new user_1.User(user.name, user.password, user);
            return userDetail;
        });
    }
    ;
    createNewUser(userObject) {
        var usr;
        var userDetail;
        return this.userRepo.post(userObject).then((user) => {
            usr = user;
            if (user == null || user == undefined) {
                throw 'user doesnot exist';
            }
            userDetail = new user_1.User(user.name, user.password, user);
            return userDetail;
        });
    }
    ;
    updateExistingUser(id, userObject) {
        var usr;
        var userDetail;
        return this.userRepo.put(id, userObject).then((user) => {
            usr = user;
            if (user == null || user == undefined) {
                throw 'user doesnot exist';
            }
            userDetail = new user_1.User(user.name, user.password, user);
            return userDetail;
        });
    }
    getCurrentUser(sessionsId) {
        return;
    }
};
__decorate([
    inject_1.inject(), 
    __metadata('design:type', userRepository_1.default)
], CurrentUserDetailService.prototype, "userRepo", void 0);
CurrentUserDetailService = __decorate([
    service_1.service({ 'singleton': true, 'serviceName': 'UserDetailService' }), 
    __metadata('design:paramtypes', [])
], CurrentUserDetailService);
exports.CurrentUserDetailService = CurrentUserDetailService;

//# sourceMappingURL=current-user-detail-service.js.map
