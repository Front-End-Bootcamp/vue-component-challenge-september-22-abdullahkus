<script setup>
const props = defineProps(["students", "groupName"])
</script>
<template>
	<!-- 
		Grubun asistanı ve öğrencileri card stilinde gösterildi.
	 -->
	<h2>{{ groupName }} Student's</h2>
	<div class="flex flex-row flex-wrap flex-justify-center">
		<div class="card card__black">{{students[groupName].assistant}}</div>
		<template v-for="student in students[groupName].students">
			<div class="card">{{student}}</div>
		</template>
	</div>
</template>
<style lang="scss" scoped>
.card {
	margin: 0 6px 6px;
	padding: 3px 6px;
	border: 1px solid gray;
	width: 250px;

	&__black {
		background-color: black;
		border: 1px solid black;
	}
}
</style>