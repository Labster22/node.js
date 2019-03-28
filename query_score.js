
//调用模块
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var mysql = require('mysql');


// 一、连接数据库
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
	// 填入数据库密码
    password : '123456',
    port : '3306',
    database : 'node.js_DB'
});
	// 执行连接
connection.connect();


// 二、创建http服务器
var server = http.createServer(function(req,res){     
    
	var pathname = url.parse(req.url).pathname;  //定义pathname为 获取url
    var query = url.parse(req.url,true).query;  //query 是一个获取url中参数的变量
	
    var student_id = query.student_id;   //定义student_id 为 student_id的参数值
	var course_id  = query.course_id; 	 //定义course_id  为 course_id的参数值
		
	
//三、根据参数返回指定数值	
	if (pathname == '/api/query_score'){   //确定url为所规定的格式（api文档里的）
		
        if(student_id && course_id) {    // 如果存在 student_id 和 course_id
                 		
			var sql = 'SELECT * FROM student_table WHERE student_id = student_id AND course_id = course_id' ;   //定义 sql为一个字符串 （从student_table提取数据）  
    
			connection.query(sql, function (error, result){  //将url中的参数与数据库进行连接、比对
				if (error){   //参数不匹配
					console.log('wrong'); 
					res.write('wrong')
				return;
				}
				
				if(result){	  //参数匹配，开始读取数据
					for ( var i = 0; i < result.length ; i++ ){   //从数据第一行开始匹配
							  //参数匹配时，输出成绩
						if ( result[i].course_id == course_id && result[i].student_id == student_id ){							     
						    res.write('成绩：'+result[i].score); 	
						break; 							
						}						
					}	
				} 				
			res.end();			
			});
		};
			
    };

}).listen(3000);



			

