(function (window) {
	'use strict';
	/* const todos = [
		{id:1,title:'zs1',completed:false},
		{id:2,title:'zs2',completed:false},
		{id:3,title:'zs3',completed:true},
		{id:4,title:'zs4',completed:false},
		{id:5,title:'zs5',completed:true}
	]; */
	window.app = new Vue({
		el:'#app',
		data:{
			todos:JSON.parse(window.localStorage.getItem('todos')||'[]'),
			newTodoText:"",
			editText:"",
			hashText:""
		},
		methods: {
			handleClickAddnewTodo:function(e){
				var value = e.target.value.trim();
				if(value.length==0){
					return;
				}
				this.todos.push({
					id:this.todos.length?this.todos[this.todos.length -1].id+1:1,
					title:value,
					completed:false
				});
				this.newTodoText = "";
			},
			handleClickDelete:function(index){
				this.todos.splice(index,1);
			},
			handleDBLclickEditing:function(index){
				this.editText = index;
			},
			handleKeyDownSaveEditing:function(item,index,e){
				var value = e.target.value.trim();
				if(value.length ==0){
					this.todos.splice(index,1);
				}
				item.title = value;
				this.editText = "";
			},
			handlekeuDownEsc:function(){
				this.editText = "";
			},
			handleDeleteAllCompleted:function(){
				for(let i = 0;i <this.todos.length; i ++){
					if(this.todos[i].completed ==true){
						this.todos.splice(i,1);
						i --;
					}
				}
			}
		},
		computed: {
			handleToggleAll:{
				get(){
					return this.todos.every(item=>item.completed)
				},
				set(){
					var value = !this.handleToggleAll;
					this.todos.forEach(element => {
						element.completed = value;
					});
				}
			},
			remaingCount(){
				return this.todos.filter(item=>!item.completed).length
			},
			FilterTodos(){
				switch (this.hashText) {
					case 'active':
						return this.todos.filter(item=>!item.completed);
						break;
					case 'completed':
						return this.todos.filter(item=>item.completed);
						break;
					default:
						return this.todos;
						break;
				}
			}
		},
		watch: {
			todos(){
				window.localStorage.setItem('todos',JSON.stringify(this.todos));
			}
		},
	})

	window.onhashchange = function(){
		var hashText = window.location.hash.substr(2);
		app.hashText = hashText;
	}
	window.onhashchange();
})(window);
