interface AwardList {
    id: number;
    empId: string;
    img: string;
    empName: string;
    mail: string;
    designation: string;
    attendance: string;
    awardtype: string;
    giftType: string;
    date: string;
    awardinfo: string;
    giftTextColor: string;
    bgColor: string;
    textColor: string;
}

export const award: AwardList[] | any =[
    {id: 1, empId: '#2987', img:'./assets/images/users/1.jpg', empName: 'Faith Harris', mail:'faith@gmail.com', designation: 'Web Designer', attendance: '85%', awardType: 'Employee of the Month Award', giftType: 'Cash', date:'01-02-2021', awardinfo:'Congratulations', giftTextColor:'primary',  bgColor: 'primary', textColor: 'success'},
    {id: 2, empId: '#4987', img:'./assets/images/users/9.jpg', empName: 'Austin Bell', mail:'austin@gmail.com', designation: 'Angular Developer', attendance: '58%', awardType: 'Best Team Player Award', giftType: 'Trophy', date:'15-01-2021', awardinfo:'Congratulations', giftTextColor:'danger',  bgColor: 'danger', textColor: 'danger'},
    {id: 3, empId: '#6729', img:'./assets/images/users/2.jpg', empName: 'Maria Bower', mail:'maria@gmail.com', designation: 'Faith Harris', attendance: '90%', awardType: 'Best Attendance Award', giftType: 'Momento', date:'13-12-2020', awardinfo:'Congratulations', giftTextColor:'success',  bgColor: 'success', textColor: 'success'},
    {id: 4, empId: '#2098', img:'./assets/images/users/10.jpg', empName: 'Peter Hill', mail:'peter@gmail.com', designation: 'Testor', attendance: '78%', awardType: 'Most Improved Performer', giftType: 'Trophy', date:'05-11-2020', awardinfo:'Congratulations', giftTextColor:'danger',  bgColor: 'danger', textColor: 'danger'},
    {id: 5, empId: '#1025', img:'./assets/images/users/3.jpg', empName: 'Victoria Lyman', mail:'victoria@gmail.com', designation: 'General Manager', attendance: '48%', awardType: 'The Motivator', giftType: 'Momento', date:'21-09-2020', awardinfo:'Congratulations', giftTextColor:'success',  bgColor: 'success', textColor: 'primary'},
    {id: 6, empId: '#3262', img:'./assets/images/users/11.jpg', empName: 'Adam Quinn', mail:'adam@gmail.com', designation: 'Accountant', attendance: '32%', awardType: 'Stand out Performer', giftType: 'Cash', date:'18-08-2020', awardinfo:'Congratulations', giftTextColor:'primary',  bgColor: 'primary', textColor: 'danger'},
    {id: 7, empId: '#3489', img:'./assets/images/users/4.jpg', empName: 'Melanie Coleman', mail:'melanie@gmail.com', designation: 'App Designer', attendance: '82%', awardType: 'Work Anniversary Award', giftType: 'Trophy', date:'15-07-2020', awardinfo:'Congratulations', giftTextColor:'danger',  bgColor: 'danger', textColor: 'success'},
    {id: 8, empId: '#3698', img:'./assets/images/users/12.jpg', empName: 'Max Wilson', mail:'max@gmail.com', designation: 'PHP Developer', attendance: '78%', awardType: 'Most Creative Award', giftType: 'Momento', date:'12-05-2020', awardinfo:'Congratulations', giftTextColor:'success',  bgColor: 'success', textColor: 'success'},
    {id: 9, empId: '#5612', img:'./assets/images/users/5.jpg', empName: 'Amelia Russell', mail:'amelia@gmail.com', designation: 'UX Designer', attendance: '49%', awardType: 'Character Award', giftType: 'Trophy', date:'22-04-2020', awardinfo:'Congratulations', giftTextColor:'danger',  bgColor: 'danger', textColor: 'primary'},
    {id: 10, empId: '#0245', img:'./assets/images/users/13.jpg', empName: 'Justin Metcalfe', mail:'justin@gmail.com', designation: 'Web Designer', attendance: '66%', awardType: 'Sales Award', giftType: 'Cash', date:'05-03-2020', awardinfo:'Congratulations', giftTextColor:'primary',  bgColor: 'primary', textColor: 'danger'},
    {id: 11, empId: '#3467', img:'./assets/images/users/6.jpg', empName: 'Sophie Anderson', mail:'faith@gmail.com', designation: 'Java Developer', attendance: '79%', awardType: 'Customer Service Award', giftType: 'Trophy', date:'15-01-2020', awardinfo:'Congratulations', giftTextColor:'success',  bgColor: 'success', textColor: 'success'},
]