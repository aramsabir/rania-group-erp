interface JobApplicationList {
    id: number;
    img: string;
    name: string;
    title: string;
    year: string;
    place: string
}

export const JobApplication:JobApplicationList[] | any  = [
    {id:1, 'img': './assets/images/users/16.jpg', name: 'Faith Harris', 'title': 'UI designer', 'year':'5 years', 'place':'USA'},
    {id:2, 'img': './assets/images/users/1.jpg', name: 'James Paige', 'title': 'UI designer', 'year':'2 years', 'place':'India'},
    {id:3, 'img': './assets/images/users/4.jpg', name: 'Liam Miller', 'title': 'WireFrameing', 'year':'1 years', 'place':'Germany'},
    {id:4, 'img': './assets/images/users/8.jpg', name: 'Kimberly Berry', 'title': 'Senior Prototyper', 'year':'3 years', 'place':'USA'},
    {id:5, 'img': './assets/images/users/9.jpg', name: 'Berry', 'title': 'Angular designer', 'year':'3 years', 'place':'USA'},
]