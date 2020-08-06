
/**
 * router.js 路由模块
 * 职责：
 *   处理路由
 *   根据不同的请求方法+请求路径设置具体的请求处理函数
 * 模块职责要单一，不要乱写
 * 我们划分模块的目的就是为了增强项目代码的可维护性
 * 提升开发效率
 */

 var fs = require('fs')
 var Student = require('./student')


 var express = require('express')

 var router = express.Router()

 // 渲染学生页面
 router.get('/students', function(req,res){
 	Student.find(function(err, students){
 		if(err){
 			return res.status(500).send('Server error')
 		}
 		res.render('index.html',{
 			fruits: [
 				'苹果',
 				'香蕉',
 				'橘子',
 				'西瓜'

 			],
 			students: students
 		})

 	})
 })

 // 渲染添加学生页面
 router.get('/students/new', function(req,res){
 	res.render('new.html')
 })


 // 添加处理学生
 router.post('/students/new', function(req,res){
 	Student.save(req.body, function(err){
 		if(err){
 			return res.status(500).send('Server error')
 		}
 		res.redirect('/students')
 	})
 })

 // 渲染编辑学生页面
 router.get('/students/edit', function(req,res){
 	Student.findById(parseInt(req.query.id), function(err, student){
 		if(err){
 			return res.status(500).send('Server error')
 		}
 		res.render('edit.html',{
 			students: student
 		})
 	})
 })


 // 处理编辑学生页面
 router.post('/students/edit', function(req,res){
 	Student.updateById(req.body, function(err){
 		if(err){
 			return res.status(500).send('Server error')
 		}
 		res.redirect('./students')
 	})
 })

 // 处理删除学生页面
 router.get('/students/delete', function(req,res){
 	Student.deleteById(req.query.id, function(err){
 		if(err){
 			return res.status(500).send('Server error')
 		}
 		res.redirect('/students')

 	})
 })

 module.exports = router