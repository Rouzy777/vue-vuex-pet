<template>
<div class="container mt-4">
	<div class="col-12 row">
		<div class="col-lg">
			<h3>В работе</h3>
			<div v-for='(todo, index) in todos' :key='`todo.title-${index}`' class="col-12 card my-3 py-3">
				<h3>{{todo.title}}</h3>
				<p class='text-muted'>Дедлайн: {{new Date(todo.date).toLocaleDateString("ru-RU")}}</p>
				<p>Описание: {{todo.description}}</p>
				<div class='mx-auto container row'>
					<button @click='done(index)' class='col btn btn-success'>Готово</button>
					<button @click='remove("todos", index)' class='col mx-2 btn btn-danger'>Удалить</button>
					<button data-toggle="modal" data-target="#editTask" @click='edit(index)' class='col btn btn-primary'>Редактировать</button>
				</div>
			</div>
		</div>
		<div class="col-lg mt-lg-0 mt-4">
			<h3>Завершено</h3>
			<div v-for='(todo, index) in doneTodos' :key='`todo.title-${index}`' class="col-12 card my-3 py-3">
				<h3>{{todo.title}}</h3>
				<p class='text-muted'>Дедлайн: {{new Date(todo.date).toLocaleDateString("ru-RU")}}</p>
				<p>Описание: {{todo.description}}</p>
				<div class='mx-auto container row'>
					<button @click='restore(index)' class='col mr-2 btn btn-warning'>Вернуть</button>
					<button @click='remove("doneTodos", index)' class='col ml-2 btn btn-danger'>Удалить</button>
				</div>
			</div>
		</div>
		<div id='editTask' class="modal fade" tabindex="-1">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Редактировать</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
                        <p>
                            Описание:
                            <textarea class='form-control mt-3' v-model='newDescription' placeholder='Task description' maxlength="2048" rows="6" cols="80"></textarea>
                        </p>
                        <p>
                            Дедлайн:
                            <datepicker v-model='newDate' placeholder='Select deadline' format="d MMMM yyyy" class='datepicker'></datepicker>
                        </p>
					</div>
					<div class="modal-footer">
						<button @click='confirmEdit' type="button" class="btn btn-primary" data-dismiss="modal">Сохранить изменения</button>
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';

export default {
	name: "TodoList",
    data: () => ({
        taskId: null,
        newDescription: '',
        newDate: ''
    }),
    components: {
        Datepicker
    },
	computed: {
		todos() {
			return this.$store.state.todos
		},
		doneTodos() {
			return this.$store.state.doneTodos
		}
	},
	methods: {
		done(index) {
			this.$store.dispatch('doneTask', index)
		},
		restore(index) {
			this.$store.dispatch('restoreTask', index)
		},
		remove(from, index) {
			this.$store.dispatch('deleteTask', [from, index])
		},
		edit(index) {
            this.taskId = index
            this.newDescription = this.todos[index].description
            this.newDate = this.todos[index].date
		},
        confirmEdit() {
            this.$store.dispatch('editTask', {
                index: this.taskId,
                description: this.newDescription,
                date: this.newDate
            })
        }
	}
}
</script>

<style lang="css" scoped>
</style>
