"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("../user/user.validation");
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(user_validation_1.UserValidation.userSignUp), auth_controller_1.AuthController.userSignUp);
router.post('/signin', (0, validateRequest_1.default)(user_validation_1.UserValidation.userSignIn), auth_controller_1.AuthController.userLogin);
exports.AuthRoutes = router;
