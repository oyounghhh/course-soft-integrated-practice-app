import { post } from '@/request'

/**
 *
 * @param {CalendarRequestDto} data
 * @returns {Promise<Array<CalendarResponseDto>>}
 */
export default function arrAppointmentCalendar(data) {
    return post('/calendar/listAppointmentCalendar', data)
}
