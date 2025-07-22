import { task } from "../Models/dbModel.js";

export const createTask = async(req,res)=>{
    const {id,title,description,status,dueDate,priority,tags,completed} = req.body;
    if(!id)
        return res.status(400).send("ID is missing \n");
    if(!title)
        return res.status(400).send("Title is missing \n");
    if(!status)
        return res.status(400).send("Status is missing \n");
    if(!priority)   
        return res.status(400).send("Priority is Missing \n");
    // const result = await task.findOne({id:id});
    if(await task.findOne({id:id})){
        // console.log(await task.findOne({id:id}));
        return res.status(400).send("Duplicate ID, please Enter an unique ID");
    }
        
    
    try {
        const newTask = new task({id,title,description,status,dueDate,priority,tags,completed});
        await newTask.save();
        return res.status(201).send("DATA SAVED SUCCESSFULLY");
    } catch (error) {
        console.error("An error occured while adding the data to the fields ",error);
        return res.status(500).send("Error occured while adding data to the database ");
    }
}




export const getAllTask = async(req,res)=>{
    try {
        const allTasks = await task.find();
        if(!allTasks.length)
            return res.send([]);
        return res.status(200).send(allTasks);
    } catch (error) {
        console.error("Error fetching all the tasks ",error);
        return res.status(500).send("Error getting the tasks");
    }
}



export const getPostsPaginationandFiltering = async(req,res)=>{
    // let page = 1,limit = 5;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page-1)*limit;

    const { status, priority, tags, completed } = req.query;
    let filter = {}
    if(status){
        filter.status = status;
    }
    if(priority){
        console.log(priority);
        
        filter.priority = priority;
    }
    if (completed !== undefined){
        filter.completed = completed === "true";
    }
    if (tags) {
        filter.tags = { $in: tags.split(',') };
    }
    
    try {
        console.log(filter);
        const tasks = await task.find(filter).skip(skip).limit(limit);
        console.log(tasks);
        return res.status(200).send(tasks);

    } catch (error) {
        console.error("Error getting the tasks list ",error);
        return res.status(500).send("Internal Server Error\n");
    }
}


export const getTaskById = async(req,res)=>{
    const id = req.params.id;
    if(!id)
        return res.status(400).send("No ID was there\n");
    try {
        const singleTask = await task.findOne({id:id});
        // console.log(singleTask);
        
        if(!singleTask)
            return res.status(404).send("No Task of that particular ID exists");
        return res.status(200).send(singleTask);
    } catch (error) {
        console.error("Error Fetching Data\n");
        return res.status(500).send("Internal Server Error\nError Fetching the data");
    }
}

export const updateTask = async (req, res) => {
    const id = req.params.id;
    if (!id)
        return res.status(400).send("No ID");

    try {
        const result = await task.findOne({ id: id });
        if (!result)
            return res.status(404).send("No task exists with this ID");

        const ntitle = req.body.title;
        const ndescription = req.body.description;
        const nstatus = req.body.status;
        const nduedate = req.body.dueDate;
        const npriority = req.body.priority;
        const ncompleted = req.body.completed;
        const ntags = req.body.tags;

        let newTitle = result.title;
        let newDescription = result.description;
        let newStatus = result.status;
        let newDueDate = result.dueDate;
        let newPriority = result.priority;
        let newCompleted = result.completed;
        let newTags = result.tags;

        if (ntitle) newTitle = ntitle;
        if (ndescription) newDescription = ndescription;
        if (nstatus) newStatus = nstatus;
        if (nduedate) newDueDate = nduedate;
        if (npriority) newPriority = npriority;
        if (ncompleted !== undefined) newCompleted = ncompleted;
        if (ntags && JSON.stringify(ntags) !== JSON.stringify(newTags)) newTags = ntags;

        await task.updateOne(
            { id: id },
            {
                $set: {
                    title: newTitle,
                    description: newDescription,
                    status: newStatus,
                    dueDate: newDueDate,
                    priority: newPriority,
                    completed: newCompleted,
                    tags: newTags
                }
            }
        );

        return res.status(200).send("Successfully updated task");

    } catch (error) {
        console.error("Error occurred while updating the task: ", error);
        return res.status(500).send("Internal Server Error while updating the task");
    }
};


export const deleteTask = async(req,res)=>{
    const id = req.params.id;
    if(!id)
        return res.status(400).send("No ID was there\n");
    try {
        const singleTask = await task.findOne({id:id});
        if(!singleTask)
             return res.status(404).send("No Task of that particular ID exists");
        const result = await task.deleteOne({id:id});
        res.status(200).send("Deleted Data Successfully");
    } catch (error) {
        console.error('An error has occured while deleting the data ',error);
        return res.status(500).send("Internal Server Error\nCould Not delete the data");
    }
}



export const getByTitle = async(req,res)=>{
    const title = req.params.title;
    try {
        const task = await task.find({title : title});
        if(!task)
            return res.status(404).send("No task by that ID");
        return res.status(200).send(task);
    } catch (error) {
        console.error("Error getting the tasks by title ",error);
        res.status(500).send("Internal server error");
    }
}