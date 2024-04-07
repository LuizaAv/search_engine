"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var fs = require("fs");
var app = express();
var PORT = 3010;
app.use(express.static("public"));
app.use(express.json());
var _a = require("./db/constants"), carModels = _a.carModels, shopNames = _a.shopNames, addressesShops = _a.addressesShops;
function includesText(texts, value) {
    var updatedValue = typeof value === "string" ? value.toLowerCase().trim() : value.toString();
    return texts.some(function (text) {
        if (typeof text === "string") {
            var updatedText = text.toLowerCase();
            return include(updatedText, updatedValue);
        }
        return false;
    });
}
function include(text, subtext) {
    var check = 3;
    var subtextIndex = 0;
    var matchCount = 0;
    for (var i = 0; i < text.length; i++) {
        if (text[i] === subtext[subtextIndex]) {
            subtextIndex++;
            matchCount++;
            if (matchCount >= check) {
                return true;
            }
            if (subtextIndex === subtext.length) {
                return true;
            }
        }
        else {
            subtextIndex = 0;
            matchCount = 0;
        }
    }
    return false;
}
app.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    function isValidEmail(email) {
        return emailRegex.test(email);
    }
    var value, usersToShow, emailRegex, carsData, carId, usersData, _i, usersData_1, item, shopData, userId, shopToShow, usersData_2, _a, shopData_1, item_1, item, i, j, followersArray_1, shopData, usersData_3, shopMatchByAddress, followersArray_2, usersData, usersList, usersData, usersList;
    return __generator(this, function (_b) {
        value = req.body.value;
        usersToShow = [];
        emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
        if (carModels.has(value.toLowerCase())) {
            try {
                carsData = JSON.parse(fs.readFileSync("./db/car.json", "utf-8"));
                carId = carsData[value];
                usersData = JSON.parse(fs.readFileSync("./db/user.json", "utf-8"));
                for (_i = 0, usersData_1 = usersData; _i < usersData_1.length; _i++) {
                    item = usersData_1[_i];
                    if (item.carId === carId) {
                        usersToShow.push(item);
                    }
                }
                res.status(200).send({ users: usersToShow, car: value });
            }
            catch (error) {
                console.error(error);
            }
        }
        else if (shopNames.has(value.toLowerCase())) {
            try {
                shopData = JSON.parse(fs.readFileSync("./db/shop.json", "utf-8"));
                userId = [];
                shopToShow = [];
                usersData_2 = JSON.parse(fs.readFileSync("./db/user.json", "utf-8"));
                for (_a = 0, shopData_1 = shopData; _a < shopData_1.length; _a++) {
                    item_1 = shopData_1[_a];
                    if (item_1.name.toLowerCase().trim() === value.toLowerCase().trim()) {
                        userId.push(item_1.userId);
                        shopToShow.push(item_1);
                    }
                }
                item = void 0;
                for (item in usersData_2) {
                    if (userId[item] === usersData_2[item].shopId) {
                        usersData_2.push(item);
                    }
                }
                for (i = 0; i < usersData_2.length; ++i) {
                    for (j = 0; j < userId.length; ++j) {
                        if (usersData_2[i].id === userId[j]) {
                            usersToShow.push(usersData_2[i]);
                        }
                    }
                }
                followersArray_1 = [];
                shopToShow.map(function (item) {
                    item.followers.map(function (eachItem) {
                        usersData_2.filter(function (elem) {
                            if (eachItem === elem.id) {
                                followersArray_1.push(elem);
                            }
                        });
                    });
                });
                res
                    .status(200)
                    .send({
                    shops: shopToShow,
                    owners: usersToShow,
                    follower: followersArray_1,
                });
            }
            catch (error) {
                console.error(error);
            }
        }
        else if (addressesShops.has(value.toLowerCase().replace(/\s+/g, " ").trim())) {
            try {
                shopData = JSON.parse(fs.readFileSync("./db/shop.json", "utf-8"));
                usersData_3 = JSON.parse(fs.readFileSync("./db/user.json", "utf-8"));
                shopMatchByAddress = shopData.filter(function (item) {
                    var arrayOfAddresses = [];
                    arrayOfAddresses.push(item.address);
                    return includesText(arrayOfAddresses, value);
                });
                followersArray_2 = [];
                shopMatchByAddress.map(function (item) {
                    item.followers.map(function (eachItem) {
                        usersData_3.filter(function (elem) {
                            if (eachItem === elem.id) {
                                followersArray_2.push(elem);
                            }
                        });
                    });
                });
                res
                    .status(200)
                    .send({
                    shopAddressMatch: shopMatchByAddress,
                    usersByAddress: usersData_3,
                    followersByAddress: followersArray_2,
                });
            }
            catch (error) {
                console.error(error);
            }
        }
        else if (isValidEmail(value)) {
            usersData = JSON.parse(fs.readFileSync("./db/user.json", "utf-8"));
            usersList = usersData.filter(function (item) {
                var valuesArray = [];
                valuesArray.push(item.email);
                return includesText(valuesArray, value);
            });
            if (usersList.length === 0) {
                console.log("No matches found.");
            }
            res.status(200).send({ usersList: usersList, usersData: usersData });
        }
        else {
            usersData = JSON.parse(fs.readFileSync("./db/user.json", "utf-8"));
            usersList = usersData.filter(function (item) {
                var valuesArray = [];
                valuesArray.push(item.name, item.surename);
                return includesText(valuesArray, value);
            });
            if (usersList.length === 0) {
                console.log("No matches found.");
            }
            res.status(200).send({ usersList: usersList, usersData: usersData });
        }
        return [2 /*return*/];
    });
}); });
app.listen(PORT, function () {
    console.log("Server is running on PORT ".concat(PORT));
});
