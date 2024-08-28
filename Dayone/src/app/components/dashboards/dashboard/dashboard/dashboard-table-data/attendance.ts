interface AttendanceList {
    id: number;
    employee: string;
    status: string;
    checkIn: string;
    checkOut: string;
    statusBg: string;
}

export const Attendance:AttendanceList[] | any  = [
    {id:1, 'employee': 'Diane Nolan', 'status':'Present', 'checkIn':'09:30 Am', 'checkOut': '06:30 Pm', 'statusBg': 'success-transparent'},
    {id:2, 'employee': 'Deirdre Russell', 'status':'Present', 'checkIn':'09:45 Am', 'checkOut': '06:30 Pm', 'statusBg': 'success-transparent'},
    {id:3, 'employee': 'Joanne Hills', 'status':'Absent', 'checkIn':'00:00:00', 'checkOut': '00:00:00', 'statusBg': 'danger-transparent'},
    {id:4, 'employee': 'Luke Ince', 'status':'Present', 'checkIn':'09:30 Am', 'checkOut': '05:15 Pm', 'statusBg': 'success-transparent'},
    {id:5, 'employee': 'Grace Mackay', 'status':'Absent', 'checkIn':'00:00:00', 'checkOut': '00:00:00', 'statusBg': 'danger-transparent'},
    {id:6, 'employee': 'Wanda Quinn', 'status':'Present', 'checkIn':'09:30 Am', 'checkOut': '06:30 Pm', 'statusBg': 'success-transparent'},
    {id:7, 'employee': 'Liam', 'status':'Present', 'checkIn':'09:30 Am', 'checkOut': '06:30 Pm', 'statusBg': 'success-transparent'}
]