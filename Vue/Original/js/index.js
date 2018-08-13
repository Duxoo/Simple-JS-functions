
//глобальный фильтр
Vue.filter('capitalize', function(string) {
	if(!string) return string
		return string[0].toUpperCase() + string.slice(1)
})

new Vue( {
	el: '#change',//элемент
	data: {//переменные и их зачения(объект)
		title: "Hello world",
		styleCSS: ""
	},
	methods: { // методы
		changeText () {
			this.title = 'Какой-либо новый текст'
		}
	}
});

new Vue({
	el: "#increment",
	data: {
		value: 1,
	},
	methods: {
		increment(value) {
			this.value = value
			if (value == 25)
				alert("25!")
		}
	},
	computed: { //обработанные свойства
		doubleValue() {
			return this.value * 2
		}
	}
});
new Vue({
	el:"#conditionals-list-loops",
	data: {
		show: true,
		cars: [
			{model:"BMW", speed: 160},
			{model:"Audi", speed: 180},
			{model:"Toyota", speed: 100},
			{model:"Honda", speed: 190}
		]
	},
	methods: {

	},
	computed: {

	}
});

new Vue({
	el:"#filter",
	data: {
		show: true,
		message:"Hello",
		cars: [
			{model:"BMW", speed: 160},
			{model:"Audi", speed: 180},
			{model:"Toyota", speed: 100},
			{model:"Honda", speed: 190}
		]
	},
	methods: {

	},
	computed: {
	 showMess() {
	 	return this.message.toUpperCase()
	 }
	},
	filters: {
		lowerCase(string) {
			return string.toLowerCase()
		},
		upperCase(string) {
			return string.toUpperCase()
		}
	}
});
//создание компонента. компонент это кусок кода, он является глобальным
Vue.component("app-car", {
	//логическая часть
	data: function() {//является функцией в компоненте
		return {
			cars: [
				{model:"BMW"},
				{model:"Audi"},
				{model:"Toyota"},
				{model:"Hyuindai"},
				{model:"Ford"},
				{model:"Volvo"},
				{model:"Mercedes"}
				]
		}
	},
	//шаблон
	template: '<div><div class="car" v-for="car in cars"><p>{{ car.model }}</p></div></div>'
})

new Vue( {
	el: "#component"
})
