const Post = require('../models/postModel');

module.exports = {
  async index(req, res) {
    const allPosts = await Post.find({});
    res.status(200).json(allPosts);
  },
  async create(req, res) {
    const { _id, title, content, author, tags } = req.body;

    const idExists = await Post.findById(_id);
    if (idExists)
      return res
        .status(400)
        .json({ error: 'Posts already existed' });

    if (!_id || !title || !content || !author || !tags) {
      return res.status(400).json({
        error: 'Missing information for the blog post',
      });
    }

    try {
      const newPost = new Post(req.body);
      await newPost.save();

      res.status(200).json({
        success: 'Successfully created new blog post',
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.message,
      });
    }
  },
  async edit(req, res) {
    const { _id } = req.params;
    const idExists = await Post.findById(_id);

    if (!idExists)
      return res.status(404).json({
        error:
          'Blog post not found',
      });

    try {
      const { title, content, author, tags } = req.body;
      const newPostData = {
        title: title,
        content: content,
        author: author,
        tags: tags,
      };
      await Post.findByIdAndUpdate(_id, newPostData);

      return res.status(200).json({
        success: 'Post atualizado com sucesso.',
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.message,
      });
    }
  },

  async delete(req, res) {
    const { _id } = req.params;
    const idExists = await Post.findById(_id);

    if (!idExists)
      return res.status(404).json({
        error:
          'Blog post not found',
      });

    try {
      await Post.findByIdAndDelete(_id);

      return res.status(200).json({
        success: 'Deleted the blog post successfully',
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.message,
      });
    }
  },
};
