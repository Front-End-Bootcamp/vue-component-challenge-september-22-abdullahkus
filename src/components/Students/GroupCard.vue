<script setup>
const props = defineProps(["groupName", "selectedGroupName"])
const emits = defineEmits(['selectedGroup'])
</script>
<template>
	<!-- 
		Seçili olan gruba göre class tanımlandı.
		Click eventi ile grubun seçilmesi sağlandı ve ilgili veri emit ile parent component'e gönderildi.
	-->
	<div class="button" :class="{'button__selected' : selectedGroupName == groupName}"
		@click="$emit('selectedGroup', props.groupName)">{{ props.groupName }}</div>
</template>
<style lang="scss" scoped>
.button {
	margin: 0 6px 6px;
	padding: 3px 6px;
	cursor: pointer;
	border: 1px solid gray;
	width: 250px;

	&:hover {
		background-color: gray;
	}

	&__selected {
		background-color: darkgray;
	}
}
</style>