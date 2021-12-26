import { Response } from "express";
import { body } from "express-validator";

export const invalidType = (type: string, res: Response) =>
  type !== "list" && type !== "board" && res.json({ message: "Invalid type" });

export const validateType = () => {
  return body("type").custom((value, { req }) => {
    if (value !== "board" && value !== "list") {
      throw new Error("Invalid type: insert list or board");
    }

    // Indicates the success of this synchronous custom validator
    return true;
  });
};
