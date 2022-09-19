<script setup>
// Vue
import { onMounted, ref } from 'vue'
//Component
import BootcampLogo from "./assets/svg/BootcampLogo.vue"
import GroupCard from "./components/Students/GroupCard.vue";
import StudentCard from "./components/Students/StudentCard.vue"
// Dummy
import data from './dummy/data.json'

// Grup isimleri SET oluşturulacak elde edildi.
const groupsName = ref([])
function getGroupsName(data) {
	if (data) {
		const groupsNameSet = new Set()
		data.forEach(function (student) {
			groupsNameSet.add(student.group)
		})
		groupsName.value = Array.from(groupsNameSet); // Set to Array
		return
	} else {
		return
	}
}

// Seçili grup child componentlere gönderebilmek ve seçili olduğuna dair class verebilmek için değişkene atandı.
const selectedGroupName = ref("")
function selectedGroup(groupName) {
	if (selectedGroupName.value == groupName) { // Seçili grubu kaldırmak için
		selectedGroupName.value = ""
		return
	} else {
		selectedGroupName.value = groupName
		return
	}
}

// İstenilen grubun verileri, istenilen formatta elde edildi.
function getGroup(studentData, groupName) {
	//Grubun varlığı kontrol edildi.
	const isGroup = studentData.find((student) => student.group === groupName)
	if (!isGroup) {
		console.log(`The group name specified as "${groupName}" could not be found.`)
		return
	}

	// Gruba ait öğrenciler ve asistan elde edildi.
	const filteredStudents = studentData.filter((student) => student.group === groupName)
	if (!filteredStudents) {
		console.log("No students belonging to this group were found.")
	}
	const assistant = filteredStudents.find((student) => student.type === "assistant")
	if (!assistant) {
		console.log("No assistants belonging to this group were found.")
	}

	// Asistan öğrenciler dizisinden silindi.
	let assistantIndex = filteredStudents.indexOf(assistant)
	filteredStudents.splice(assistantIndex, assistantIndex)

	// Öğrenci isimleri elde edildi.
	const students = filteredStudents.reduce(function (students, student) {
		students.push(student.name)
		return students
	}, [])

	// Elde edilen veriler istenilen formatta çevrildi.
	const formatedGroup = {
		[groupName]: {
			students: students,
			assistant: assistant.name
		}
	}

	return formatedGroup
}

onMounted(() => {
	getGroupsName(data)
})
</script>

<template>
	<BootcampLogo />
	<br />

	<h2>Groups</h2>
	<div class="flex flex-row flex-wrap flex-justify-center">
		<GroupCard v-for="(groupName, index) in groupsName" :key="index" :groupName="groupName"
			@selectedGroup="selectedGroup(groupName)" :selectedGroupName="selectedGroupName" />
	</div>

	<hr class="p-5" v-if="selectedGroupName !== '' " />

	<StudentCard v-if="selectedGroupName !== '' " :students="getGroup(data, selectedGroupName)"
		:groupName="selectedGroupName" />
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
