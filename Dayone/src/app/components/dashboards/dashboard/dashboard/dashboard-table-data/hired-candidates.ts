interface hiredCandidatesList {
    id: number;
    img: string;
    name: string;
    title: string;
    year: string;
    place: string
}

export const hiredCandidates:hiredCandidatesList[] | any  = [
    {id:1, 'img': './assets/images/users/2.jpg', name: 'Lance', 'title': 'Angular developer', 'year':'5 years', 'place':'USA'},
    {id:2, 'img': './assets/images/users/5.jpg', name: 'Nichols', 'title': 'UI designer', 'year':'2 years', 'place':'India'},
    {id:3, 'img': './assets/images/users/6.jpg', name: 'Norris', 'title': 'Vue developer', 'year':'1 years', 'place':'Germany'},
    {id:4, 'img': './assets/images/users/10.jpg', name: 'Jenson', 'title': 'WireFrameing', 'year':'3 years', 'place':'USA'},
    {id:5, 'img': './assets/images/users/12.jpg', name: 'Harrison', 'title': 'Senior Prototyper', 'year':'3 years', 'place':'USA'},
]