function capitalyzer(s){
	return s.toUpperCase();
}

var s = "stringaDiProva";
capitalyzer(s);

var data = [
  {id:'01', name:'duffy'},
  {id:'02', name:'michey'},
  {id:'03', name:'donald'},
  {id:'04', name:'goofy'},
  {id:'05', name:'minnie'},
  {id:'06', name:'scrooge'}
];
var key = 'name';
var values = ['goofy', 'scrooge'];

function select(data, key, values){
	return data.filter(	function(i){
			var ikey=i[key];
			//console.log(ikey)
			return values.some(function(item){
				//console.log(item)
				return item===ikey;
		});
	});
}

console.log(select(data,key,values));