import jwt from "jsonwebtoken";
import { insertSession } from "../model/session/SessionModel.js";
import { updateOneAdminUser } from "../model/adminUser/AdminUserModel.js";

export const signAccessJWT = async (payload) => {
  const accessJWT = jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
  const obj = {
    token: accessJWT,
    type: "jwt",
  };
  await insertSession(obj);
  return accessJWT;
};

export const signRefreshJWT = async (payload) => {
  const refreshJwt = jwt.sign({ payload }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
  await updateOneAdminUser(payload, { refreshJwt });
  return refreshJwt;
};

// it is just a normal js function
export const createJWTs = async (payload) => {
  return {
    accessJWt: await signAccessJWT(payload),
    refreshJWT: await signRefreshJWT(payload),
  };
};
