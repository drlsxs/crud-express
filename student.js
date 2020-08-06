// student.js
// 数据操作文件模块
// 职责：操作文件中的数据，只处理数据，不关心业务

// 这里才是我们学习node 的精华部分,奥义之所在
// 封装异步 API


var fs = require('fs')

var dbPath = './db.json'

/**
 * 获取学生列表
 * @param  {Function} callback 回调函数
 */

exports.find = function(callback){
	fs.readFile(dbPath, 'utf8', function(err,data){
		if(err){
			return callback(err)
		}
		callback(null, JSON.parse(data).students)
	})
}

/**
 * 根据 id 获取学生信息对象
 * @param  {Number}   id       学生 id
 * @param  {Function} callback 回调函数
 */

 exports.findById  = function(id, callback){
 	fs.readFile(dbPath, 'utf8', function(err,data){
 		if(err){
 			return callback(err)
 		}
 		var students = JSON.parse(data).students
 		var ret = students.find(function(item){
 			return item.id === parseInt(id)
 		})
 		callback(null, ret)
 	})
 }

 /**
 * 添加保存学生
 * @param  {Object}   student  学生对象
 * @param  {Function} callback 回调函数
 */

 exports.save = function(studentbc, callback){
 	fs.readFile(dbPath, 'utf8', function(err,data){
 		if(err){
 			return callback(err)
 		}
 		var students = JSON.parse(data).students
 		studentbc.id = students[students.length -1].id + 1
 		students.push(studentbc)
 		var fileData = JSON.stringify({
 			students: students
 		})

 		fs.writeFile(dbPath, fileData, function(err){
 			if(err){
 				return callback(err)
 			}
 			callback(null)
 		})
 	})
 }

 /**
 * 更新学生
 */

 exports.updateById = function(studentup, callback){
 	fs.readFile(dbPath, 'utf8', function(err, data){
 		if(err){
 			return callback(err)
 		}
 		var students = JSON.parse(data).students
 		    // 注意：这里记得把 id 统一转换为数字类型
			 studentup.id = parseInt(studentup.id)

 		var stu = students.find(function(item){
 			return item.id === studentup.id
 		})

 		for(var key in studentup){
 			stu[key] = studentup[key]
 		}
 		var fileData = JSON.stringify({
 			students: students
 		})

 		fs.writeFile(dbPath, fileData, function(err){
 			if(err){
 				return callback(err)
 			}
 			callback(null)
 		})

 	})

 }

 /**
 * 删除学生
 */

 exports.deleteById = function(id, callback){
 	fs.readFile(dbPath, 'utf8', function(err, data){
 		if(err){
 			return callback(err)
 		}
 		var students = JSON.parse(data).students
 		var deleteId = students.findIndex(function(item){
 			return item.id === parseInt(id)
 		})
 		students.splice(deleteId, 1)

 		var fileData = JSON.stringify({
 			students: students
 		})
 		fs.writeFile(dbPath, fileData, function(err){
 			if(err){
 				return callback(err)
 			}
 			callback(null)
 		})
 	})
 }