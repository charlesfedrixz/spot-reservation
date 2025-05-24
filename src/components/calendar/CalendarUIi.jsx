import { useState } from 'react'
import { Calendar } from '../ui/calendar'
import { DayPicker } from 'react-day-picker'

export default function CalendarUi() {
	const [date, setDate] = useState(new Date())
	return <DayPicker date={date} setDate={setDate} />
}
