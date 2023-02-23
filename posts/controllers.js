import mongoose from "mongoose";
import Post from "./schema.js";

//Creating New Post
export const CreateNewPost = async (req, res) => {
    try {

    }
    catch (err) {
        return res.status(statusCodes.internalServerError).json({ message: err.message });
    }
}

//Updating Existing Post
export const UpdatePostById = async (req, res) => {
    try {

    }
    catch (err) {
        return res.status(statusCodes.internalServerError).json({ message: err.message });
    }
}

//Delete Existing Post
export const DeletePostById = async (req, res) => {
    try {

    }
    catch (err) {
        return res.status(statusCodes.internalServerError).json({ message: err.message });
    }
}

//Get Post with Filter
export const GetAllPostWithFilter = async (req, res) => {
    try {

    }
    catch (err) {
        return res.status(statusCodes.internalServerError).json({ message: err.message });
    }
}

//Get Post By ID
export const GetPostByID = async (req, res) => {
    try {

    }
    catch (err) {
        return res.status(statusCodes.internalServerError).json({ message: err.message });
    }
}