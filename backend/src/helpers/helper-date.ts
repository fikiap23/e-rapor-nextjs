// Helper function to convert date to yyyy-MM-dd format
export function formatDate(date: Date): string {
    const year: number = date.getFullYear()
    const month: string = String(date.getMonth() + 1).padStart(2, '0')
    const day: string = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

// Helper function to convert month index to Indonesian month name
function getIndonesianMonth(monthIndex: number): string {
    const months: string[] = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ]
    return months[monthIndex]
}

// Helper function to convert day index to Indonesian day name
function getIndonesianDay(dayIndex: number): string {
    const days: string[] = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    return days[dayIndex]
}

// Helper function to convert date to yyyy-MM-dd format with Indonesian month name
export function formatDateWithIndonesianMonth(date: Date): string {
    const year: number = date.getFullYear()
    const month: string = getIndonesianMonth(date.getMonth())
    const day: string = String(date.getDate()).padStart(2, '0')
    return `${day} ${month} ${year}`
}

// Helper function to convert date to dd Nama_Bulan yyyy format with Indonesian month and day name
export function formatDateWithIndonesianMonthAndDay(date: Date): string {
    const year: number = date.getFullYear()
    const month: string = getIndonesianMonth(date.getMonth())
    const day: string = String(date.getDate()).padStart(2, '0')
    const dayName: string = getIndonesianDay(date.getDay())
    return `${dayName}, ${day} ${month} ${year}`
}
// get hari
export function getIndonesianDayFromDate(date: Date): string {
    const days: string[] = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    return days[date.getDay()]
}
