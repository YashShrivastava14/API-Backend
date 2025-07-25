const express=require('express')
const productController = require('../Controllers/ProductController')
const TeacherController = require('../Controllers/TeacherController')
const UserController = require('../Controllers/UserController')
const route=express.Router()
const auth = require('../Middleware/auth')


route.post('/createProduct',productController.createProduct)
route.get('/getAllProduct',productController.getAllProducts)
route.get('/viewProduct/:id',productController.getProductById)
route.put('/updateProduct/:id',productController.updateProduct)
route.delete('/deleteProduct/:id',productController.deleteProduct)

route.post('/createTeacher',TeacherController.createTeacher)
route.get('/getAllTeachers',TeacherController.getAllTeachers)
route.get('/viewTeacher/:id',TeacherController.getTeacherById)
route.put('/updateTeacher/:id',TeacherController.updateTeacher)
route.delete('/deleteTeacher/:id' , TeacherController.deleteTeacher)

route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.get('/profile', auth, UserController.getProfile)
route.post('/logout' , UserController.logout)









module.exports=route