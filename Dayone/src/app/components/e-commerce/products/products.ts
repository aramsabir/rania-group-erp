export interface productsType{
    id: number;
    title?: string;
    img?: string;
    starText?: number;
    review?: string;
    lastValue?: string;
    newValue?: string;
    bageText?: string;
    textStatus: string;
}

export const productsData: productsType[] = [
    {id: 1, title: 'Flower Pot', img:'./assets/images/products/1.jpg', starText: 1, review: '48', lastValue : '$74', newValue:'$50', bageText:'New', textStatus: 'primary'},
    {id: 2, title: 'Sofa Chair', img:'./assets/images/products/2.jpg', starText: 1, review: '18', lastValue : '$450', newValue:'$250', bageText:'', textStatus: ''},
    {id: 3, title: 'Watch', img:'./assets/images/products/3.jpg', starText: 1, review: '12', lastValue : '$860', newValue:'$350', bageText:'50%', textStatus: 'warning'},
    {id: 4, title: 'Table', img:'./assets/images/products/4.jpg', starText: 1, review: '02', lastValue : '$250', newValue:'$130', bageText:'', textStatus: ''},
    {id: 5, title: 'Cup', img:'./assets/images/products/5.jpg', starText: 1, review: '06', lastValue : '$125', newValue:'$55', bageText:'', textStatus: ''},
    {id: 6, title: 'Kurti', img:'./assets/images/products/6.jpg', starText: 1, review: '16', lastValue : '$450', newValue:'$250', bageText:'', textStatus: ''},
]