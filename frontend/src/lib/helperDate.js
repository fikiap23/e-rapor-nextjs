// Helper function to convert date to yyyy-MM-dd format
export function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Helper function to convert month index to Indonesian month name
function getIndonesianMonth(monthIndex) {
  const months = [
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
function getIndonesianDay(dayIndex) {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  return days[dayIndex]
}

// Helper function to convert date to yyyy-MM-dd format with Indonesian month name
export function formatDateWithIndonesianMonth(date) {
  const year = date.getFullYear()
  const month = getIndonesianMonth(date.getMonth())
  const day = String(date.getDate()).padStart(2, '0')
  return `${day} ${month} ${year}`
}

// Helper function to convert date to dd Nama_Bulan yyyy format with Indonesian month and day name
export function formatDateWithIndonesianMonthAndDay(date) {
  const year = date.getFullYear()
  const month = getIndonesianMonth(date.getMonth())
  const day = String(date.getDate()).padStart(2, '0')
  const dayName = getIndonesianDay(date.getDay())
  return `${dayName}, ${day} ${month} ${year}`
}
