var db = require('./db');

module.exports ={
	getById: function(id, callback){
		var sql = "select * from users where id="+id;
		db.getResult(sql, function(result){

			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	getByUname: function(uname, callback){
		var sql = "select * from users where username='"+uname+"'";
		db.getResult(sql, function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	validate: function(user, callback){
		var sql = "select * from users where username='"+user.username+"' and password='"+user.password+"'";
		db.getResult(sql, function(result){
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	userGetAll:function(q,callback){
		var sql="";
		if (q==null) {
			sql = "select * from users";
		}
		else
		{
			sql = "select * from users where name like '%"+q+"%' or companyName like '%"+q+"%' or username like '%"+q+"%' or id like '%"+q+"%'";
		}
		db.getResult(sql, function(results){
				callback(results);
			
		});
	},
	insert: function(user, callback){
		var sql = "INSERT INTO users VALUES (null,'"+user.username+"','"+user.password+"','"+user.name+"','"+user.type+"')";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(id, callback){
		var sql = "delete from users where id="+id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update: function(user, callback){
		var sql="";
		if (user.type=='admin') {
			sql = "UPDATE users SET name='"+user.name+"' ,username='"+user.username+"' , password='"+user.password+"',type='"+user.type+"' where id="+user.uid;
		}
		else
		{
			sql = "UPDATE users SET name='"+user.name+"' ,username='"+user.username+"' , password='"+user.password+"' where id="+user.uid;
		}
		console.log(sql);
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	restauGetByID: function(data, callback){
		var	sql = "SELECT * from restaurant where r_id="+data;
		db.getResult(sql,function(result){
			callback(result[0]);
		});
	},

	addRestau : function(user, callback){
		var sql = "INSERT INTO restaurant VALUES (null,'"+user.name+"','"+user.loc+"','"+user.sb+"')";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getAllrestau: function(id, callback){
		var sql = "select * from restaurant";
		db.getResult(sql, function(result){
				callback(result);
		});
	},
	restauUpdate: function(user, callback){
		var sql = "UPDATE restaurant SET name='"+user.name+"' ,location='"+user.loc+"' , shortBack='"+user.sb+"' where r_id="+user.id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	restauDelete: function(id, callback){
		var sql = "delete from restaurant where r_id="+id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	foodGetByID: function(data, callback){
		var	sql = "SELECT * from foods where f_id="+data;
		db.getResult(sql,function(result){
			callback(result[0]);
		});
	},
	addFood : function(user, callback){
		var sql = "INSERT INTO foods VALUES (null,'"+user.name+"','"+user.type+"','"+user.r_id+"')";
		console.log(sql);
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getAllfood: function(id, callback){
		var sql = "select f_id,foods.name 'FN',restaurant.name 'RN',location,type from restaurant,foods where restaurant.r_id=foods.r_id";
		db.getResult(sql, function(result){
				callback(result);
		});
	},

}