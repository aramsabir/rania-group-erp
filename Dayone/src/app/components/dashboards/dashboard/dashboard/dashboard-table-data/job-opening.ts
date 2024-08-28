interface jobOpeningList {
    id: number;
    img: string;
    name: string;
    title: string;
    vacancies: string;
    place: string
}

export const JobOpening:jobOpeningList[] | any  = [
    {id:2, 'img': './assets/images/photos/html.png', name: 'Experienced Html Developer', 'title': '28 Nov 2020', 'vacancies':'2 vacancies', 'place':'USA'},
    {id:3, 'img': './assets/images/photos/jquery.png', name: 'Experienced Jquery Developer', 'title': 'WireFrameing', 'vacancies':'1 vacancies', 'place':'USA'},
    {id:4, 'img': './assets/images/photos/vue.png', name: 'Vue js Developer', 'title': '24 Oct 2020', 'vacancies':'6 vacancies', 'place':'USA'},
    {id:5, 'img': './assets/images/photos/html.png', name: 'Kimberly Berry', 'title': '14 Oct 2020', 'vacancies':'4 vacancies', 'place':'USA'},
]