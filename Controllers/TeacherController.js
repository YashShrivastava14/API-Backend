const teacherModel = require('../Models/Teacher')
const cloudinary = require('../Utils/Cloudinary')
const fs = require('fs')


class TeacherController {


    static createTeacher = async (req, res) => {
        try {
            const { name, email } = req.body;

            if (!name || !email || !req.files || !req.files.image) {
                return res.status(400).json({ message: 'Name and image are required' });
            }

            const file = req.files.image;

            const result = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "teachers",
            });

            // Remove temp file
            fs.unlinkSync(file.tempFilePath);

            const teacher = await teacherModel.create({
                name,
                email,
                image: {
                    public_id: result.public_id,
                    url: result.secure_url,
                }
            })
            res.status(201).json({ message: "Teacher added successfully", teacher });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server Error" });
        }

    }

    static getAllTeachers = async (req, res) => {
        try {
            const teachers = await teacherModel.find();
            res.status(200).json(teachers);
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    };

    static getTeacherById = async (req, res) => {
        try {
            const teacher = await teacherModel.findById(req.params.id);
            console.log(teacher);

            if (!teacher) return res.status(404).json({ message: "Teacher not found" });
            res.status(200).json(teacher);
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    };

    static updateTeacher = async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const { email } = req.body;
      const file = req.files?.image;

      const teacher = await teacherModel.findById(id);
      console.log(teacher);
      
      if (!teacher) return res.status(404).json({ message: "Teacher not found" });

      // If new image is uploaded, delete old one and upload new
      if (file) {
        // Delete old image
        await cloudinary.uploader.destroy(product.image.public_id);

        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: 'teachers',
        });

        fs.unlinkSync(file.tempFilePath);

        teacher.image = {
          public_id: result.public_id,
          url: result.secure_url
        };
      }

      if (name) teacher.name = name;
      if (email) teacher.name = name;

      await teacher.save();

      res.status(200).json({ message: "Teacher's data updated", teacher });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

  static deleteTeacher = async (req, res) => {
    try {
      const { id } = req.params;
      const teacher = await teacherModel.findById(id);
      if (!teacher) return res.status(404).json({ message: "Teacher's data not found for this id" });

      // Delete image from Cloudinary
      await cloudinary.uploader.destroy(teacher.image.public_id);

      await teacher.deleteOne();

      res.status(200).json({ message: "Teacher's data deleted" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error : error.message });
    }
  };





}

module.exports = TeacherController