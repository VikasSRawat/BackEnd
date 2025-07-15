import { blog } from "../Models/blogs.Model.js"

export const getAllPosts = async(req,res)=>{
    try {
        const blogs = await blog.find();
        if(!blogs.length)
            return res.send([]);
        return res.send(blogs);
    } catch (error) {
        console.error("Error getting all blogs from the database ",error);
        return res.status(500).send("Error getting all blogs");
    }
}

export const getPostById = async(req,res)=>{
    console.log("Coming here");
    
    const id = req.params.id;
    console.log("Fetching the blog post for ",id);
    
    try {
        const singleBlog = await blog.findOne({id:id});
        console.log(singleBlog);
        if(!singleBlog)
            return res.status(404).send("Post not found");
        return res.send(singleBlog);
    } catch (error) {
        console.error("Error getting the post ",error);
        return res.status(500).send("Error getting the blog by ID");
    }
}

export const createPost = async(req,res)=>{
    console.log(req.body);
    
    const {id,title,content,author,tags} = req.body;
    try {
        if(!title.length && !content.length && !author.length){
            console.log("Missing either title, content, or author");
            return res.status(400).send("Bad Request, Missing Field(s)");
        }
        if((await blog.findOne({id:id}))){
            console.log("Duplicate ID");
            return res.status(400).send("Duplicate ID");
        }
        const newBlog = new blog({id,title,content,author,tags});
        await newBlog.save();
        return res.status(201).json({ message: "Blog added", blog: newBlog });
    } catch (err) {
        console.error("Error adding the blogPost");
        return res.status(500).send("Error Adding the blog");
    }
}


export const updatePost = async(req,res)=>{
    const id = req.params.id;
    try {
        const result = await blog.findOne({id : id});
        if(!result)
            return res.status(404).send("No Blog exists with that ID");
        // const {ntitle,ncontent,nauthor,ntags} = req.body;
        const ntitle = req.body.title;
        const ncontent = req.body.content;
        const nauthor = req.body.author;
        const ntags = req.body.tags;
        console.log(ntitle);
        console.log(ntags);
        
        let newTitle = result.title;
        let newContent = result.content;
        let newAuthor = result.author;
        let newTags = result.tags;

        if(ntitle)
            newTitle = ntitle;
        if(ncontent)
            newContent = ncontent;
        if(nauthor)
            newAuthor = nauthor;
        if(ntags != newTags)
            newTags = ntags;

        await blog.updateOne({id:id},{$set:{title:newTitle,content:newContent,author:newAuthor,tags:newTags}});
        return res.status(200).send("Successfully updated");
    } catch (error) {
        console.error("Error updating ",error);
        res.status(500).send("Error updating the blog");
    }
}

export const deletePost = async(req,res)=>{
    const id = req.params.id;
    try {
        const result = await blog.findOne({id:id});
        if(!result){
            console.log("No blog exists with that id");
            return res.status(404).send("No Blog exists with that ID");
        }
        await blog.deleteOne({id:id});
        return res.status(204).send();
    } catch (error) {
        console.error("Error deleting blog\n",error);
        res.status(500).send("Error deleting");
    }
}