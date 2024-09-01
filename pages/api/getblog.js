import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/blog";
export default async function handle(req, res) {
  await mongooseConnect();

  const { method } = req;

  //api for get blog
  if (method === "GET") {
    if (req.query?.id) {
      // get blog by id
      const blog = await Blog.findById(req.query.id);
      res.status(200).json(blog);
    } else if (req.query?.blogcategory) {
      // get blog by category
      const blogs = await Blog.find({
        blogcategory: req.query.blogcategory,
      }).sort({ createdAt: -1 });
      res.status(200).json(blogs);
    } else if (req.query?.tags) {
      // get blog by tags
      const blogs = await Blog.find({ tags: req.query.tags }).sort({
        createdAt: -1,
      });

      res.status(200).json(blogs);
    } else if (req.query?.slug) {
      // get blog by slug
      const blogs = await Blog.find({ slug: req.query.slug }).sort({
        createdAt: -1,
      });
      res.status(200).json(blogs);
    } else {
      // get all blogs
      const blogs = await Blog.find().sort({ createdAt: -1 });
      res.status(200).json(blogs);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
