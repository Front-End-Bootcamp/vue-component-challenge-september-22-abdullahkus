// Dummy
import DATA from '../dummy/data.json'

// Grup isimleri SET oluşturulacak elde edildi.
export function getGroupsName(data = DATA) {
	if (!data.length > 0) { // Boş data kontrolü
		return
	}

	const groupsNameSet = new Set()
	data.forEach(function (student) {
		groupsNameSet.add(student.group)
	})

	const groupsName = Array.from(groupsNameSet)
	return groupsName
}

// İstenilen grubun verileri, istenilen formatta elde edildi.
export function getGroup(groupName, studentData = DATA) {
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
	const students = filteredStudents.reduce(function (current, student) {
		return current = [...current, student.name];
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