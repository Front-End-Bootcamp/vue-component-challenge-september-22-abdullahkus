<script setup>
// Vue
import { onMounted, ref } from 'vue'
//Component
import BootcampLogo from "./assets/svg/BootcampLogo.vue"
import GroupCard from "./components/Students/GroupCard.vue";
import StudentCard from "./components/Students/StudentCard.vue"
// Service
import { getGroupsName, getGroup } from "./services/studentServices"

const groupsName = ref([])

onMounted(() => {
	groupsName.value = getGroupsName()
})

const selectedGroupName = ref("") // Seçili grup child componentlere gönderebilmek ve seçili olduğuna dair class verebilmek için değişkene atandı.
function selectedGroup(groupName) {
	if (selectedGroupName.value == groupName) { // Seçili grubu kaldırmak için
		selectedGroupName.value = ""
		return
	} else {
		selectedGroupName.value = groupName
		return
	}
}
</script>

<template>
	<BootcampLogo />
	<br />

	<h2>Groups</h2>
	<div class="flex flex-row flex-wrap flex-justify-center">
		<!-- ID değeri bulunmadığı için index numarasıyla benzersizleştirildi. -->
		<GroupCard v-for="(groupName, index) in groupsName" :key="index" :groupName="groupName"
			@selectedGroup="selectedGroup(groupName)" :selectedGroupName="selectedGroupName" />
	</div>

	<template v-if="selectedGroupName !== '' ">
		<hr class="p-5" />
		<StudentCard :students="getGroup(selectedGroupName)" :groupName="selectedGroupName" />
	</template>
</template>

<style lang="scss">
.flex {
	display: flex;

	&-column {
		flex-direction: column;
	}

	&-row {
		flex-direction: row;
	}

	&-wrap {
		flex-wrap: wrap;
	}

	&-justify-center {
		justify-content: center;
	}
}

.p {
	&-5 {
		margin: 12px 0;
	}
}
</style>
