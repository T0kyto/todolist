// Получаем строку с правельным падежем, в зависимости от часа или минуты
export const getStringTime = (time: number, mode: "hours" | "minutes"): string => {

	time = Math.floor(time)

	if(mode === 'minutes'){
		if(time > 10 && time < 20){
			return `${time} минут назад`
		}
		if(time % 10 === 1 || time % 10 === 0){
			return `${time} минуту назад`
		}
		if(time % 10 < 5){
			return `${time} минуты назад`
		}
		return `${time} минут назад`
	}

	if(mode === 'hours'){
		if(time > 10 && time < 20){
			return `${time} часов назад`
		}
		if(time % 10 === 1 || time % 10 === 0){
			return `${time} час назад`
		}
		if(time % 10 < 5){
			return `${time} часа назад`
		}
		return `${time} часов назад`
	}

	return ''
}

export const getStandartTime = (timestamp: Date) => {
	const monthes = 
			 ["января",
			 "февраля",
			 "марта",
			 "апреля",
			 "мая",
			 "июня",
			 "июля",
			 "августа",
			 "сентября",
			 "октября",
			 "ноября",
			 "декабря"]
		

		const date = timestamp.getDate()
		const monthNum: number = timestamp.getMonth()
		const months: string = monthes[monthNum + 1]
		const year: number = timestamp.getFullYear()
		const hours: number = timestamp.getHours()
		const minutes: number = timestamp.getMinutes()

		return `${date} ${months} ${year}, ${hours < 10 ? '0' + hours.toString() : hours}:${minutes < 10 ? '0' + minutes.toString() : minutes}`
}

// Получаем строку ,отражающую сколько минут назад создана карточка
export const getTimeLabel = (time: number):string => {

	const currentTime = new Date().getTime()
	const timeLeft = currentTime - time

	if(timeLeft / 10000 <= 1){
		return "Только что"
	}else if(timeLeft / 1000 / 60 <= 60){
		return getStringTime(Math.round(timeLeft/1000/60), 'minutes')
	}else if(timeLeft / 1000 / 60 / 60 <= 24){
		return getStringTime(Math.round(timeLeft/1000/60/60), 'hours')
	}else{
		const parsedDate = new Date(time)
		return getStandartTime(parsedDate)
	}
}