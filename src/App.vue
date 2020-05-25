<template>
<div id="app">
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<a class="navbar-brand" href="#">Pet</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
			<div class="navbar-nav">
				<router-link v-for="item in links" :key="item.title" :to="item.link" tag="a" class="nav-item nav-link" active-class="active" exact>
					{{item.title}}
				</router-link>
			</div>
		</div>
	</nav>
	<router-view />
</div>
</template>

<script>
export default {
	name: "App",
	data: () => ({
		links: [{
				link: "/",
				title: "Create"
			},
			{
				link: "/todos",
				title: "All todos"
			},
			{
				link: "/weather",
				title: "Weather"
			},
		]
	}),
	mounted() {
		let todos = [JSON.parse(localStorage.getItem("todos")), JSON.parse(localStorage.getItem("doneTodos"))]
		this.$store.dispatch('fetchTodos', todos)
	}
}
</script>

<style>
.min-vh-90 {
	min-height: 90vh;
}

.datepicker input {
	width: 100%;
	display: block;
	width: 100%;
	height: calc(1.5em + .75rem + 2px);
	padding: .375rem .75rem;
	font-size: 1rem;
	font-weight: 400;
	line-height: 1.5;
	color: #495057;
	background-color: #fff;
	background-clip: padding-box;
	border: 1px solid #ced4da;
	border-radius: .25rem;
	transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out
}

.datepicker-danger input {
	border-color: #dc3545 !important
}
</style>
