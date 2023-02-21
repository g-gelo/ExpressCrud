import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const port = 3000;

app.use(express.json());

app.post("/register", async (req, res) => {
    const { title, content, publish } = req.body;

    const post = await prisma.post.create({
        data: {
            title,
            content,
            published: publish,
        },
    });

    res.json({ post });
});

app.get("/books", async (req, res) => {
    const posts = await prisma.post.findMany();

    res.json({ post: posts });
});

app.put("/update/:id", async (req, res) => {
    const { title, content, published } = req.body;
    const { id } = req.params;

    const post = await prisma.post.update({
        where: {
            id: parseInt(id),
        },
        data: {
            title,
            content,
            published,
        },
    });

    res.json({ post });
});
app.delete("/delete/:id", async (req, res) => {
    const postId = parseInt(req.params.id);
    const deletedPost = await prisma.post.delete({
        where: { id: postId },
    });
    res.json([
        {
            message: "Post deleted successfully",
        },
    ]);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
