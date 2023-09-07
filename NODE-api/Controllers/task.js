import ErrorHandler from "../middlewares/ErrorHandler.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res,next) => {
  try {
     const { title, description } = req.body;

     const task = await Task.create({ title, description, user: req.user });

     res.status(200).json({
       success: true,
       message: "task added succesfully",
     });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res,next) => {
   try {
      const userId = req.user.id;
      const allTask = await Task.find({ user: userId });
      // console.log(allTask);

      res.status(200).json({
        success: true,
        message: "get all task",
        allTask,
      });
   } catch (error) {
     next(error);
   }
};

export const updateTask = async (req, res, next) => {
  try {
     const id = req.params.id;
     const thisTask = await Task.findById(id);

     if (!thisTask) {
       // console.log("skdjf");
       // return res.json({ id });
       return next(new ErrorHandler("Invalid Id", 400));
     }

     thisTask.isCompleted = !thisTask.isCompleted;
     await thisTask.save();

     res.status(200).json({
       success: true,
       message: "task updated successfully",
     });
  } catch (error) {
    next(error);
  }
 
};

export const deleteTask = async (req, res, next) => {
  try {
     const task = await Task.findById(req.params.id);

     if (!task) {
       return next(new ErrorHandler("Invalid Id", 400));
     }

     await task.deleteOne();

     res.status(200).json({
       success: true,
       message: "task deleted successfully",
     });
  } catch (error) {
    next(error);
  }
};
