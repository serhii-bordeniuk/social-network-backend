const { validationResult } = require("express-validator");

const Post = require("../models/post");
const handleCatchError = require("../util/error");

exports.getPosts = (req, res, next) => {
    Post.find()
        .then((posts) => {
            res.status(200).json({
                message: "Fetched posts successfully",
                posts: posts,
            });
        })
        .catch((err) => {
            handleCatchError(err, next);
        });
};

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed, entered data is incorrect");
        error.statusCode = 422;
        throw error;
    }
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
        title: title,
        content: content,
        imageUrl: "images/duck.jpg",
        creator: {
            name: "Serhii",
        },
    });
    post.save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: "Post created successfully",
                post: result,
            });
        })
        .catch((err) => {
            handleCatchError(err, next);
        });
};

exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
        .then((post) => {
            if (!post) {
                const error = new Error("Could not find post");
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                post: post,
            });
        })
        .catch((err) => {
            handleCatchError(err, next);
        });
};
