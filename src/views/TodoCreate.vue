<template>
<div class="d-flex min-vh-90">
	<div class="col-lg-5 col-md-9 col-12 m-auto">
		<h1>Create Task</h1>
		<input class='form-control mt-3' :class='{"border-danger": ($v.title.$dirty && !$v.title.required)}' v-model='title' placeholder="Task name">
		<datepicker :class='{"datepicker-danger": ($v.date.$dirty && !$v.date.required)}' placeholder='Select deadline' format="d MMMM yyyy" class='datepicker mt-3' v-model='date'></datepicker>
		<div>
			<textarea class='form-control mt-3' v-model='description' maxlength="2048" placeholder="Task description" rows="6" cols="80"></textarea>
			<p class='text-right text-muted mb-0'>
				<small>{{description.length}} / 2048</small>
			</p>
		</div>
		<button @click='createTask' class='btn btn-primary col-12'>Add task</button>
	</div>
	<div id='toast' aria-live="assertive" aria-atomic="true" class="toast m-5" data-delay="2500" style="position: absolute; top: 0; right: 0;">
		<div class="toast-header">
			<strong class="mr-auto">{{titleToast}}</strong>
			<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
		<div class="toast-body">
			Новая задача создана
		</div>
	</div>
</div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import Datepicker from 'vuejs-datepicker';
import $ from 'jquery'

export default {
	name: 'Home',
	components: {
		Datepicker
	},
	data: () => ({
		titleToast: '',
		title: '',
		description: '',
		date: '',
	}),
    validations: {
        title: {
            required,
            minLength: minLength(4)
        },
        date: {
            required
        }
    },
	methods: {
		createTask() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }

			$('#toast').toast('show')
			this.titleToast = this.title
			this.$store.dispatch('addTask', {
				title: this.title,
				description: this.description,
				date: this.date,
				done: false
			})
			this.title = ''
			this.description = ''
			this.date = null
		}
	}
}
</script>

<style>
textarea {
	resize: none;
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
    border-color: #dc3545!important
}
</style>
