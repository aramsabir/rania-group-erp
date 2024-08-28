export interface shoppingCartType {
    id: number;
    productImg : string;
    product: string;
    quantity: number;
    unitPrice: string;
    subTotal: string;
}

export const shoppingCartData: shoppingCartType[] = [
    {id: 1, productImg: './assets/images/products/1.jpg', product:'Flower Pot', quantity: 1, unitPrice: '$122.21', subTotal: '$122.21'},
    {id: 2, productImg: './assets/images/products/2.jpg', product:'Kurtis', quantity: 2, unitPrice: '$20.63', subTotal: '$41.26'},
    {id: 3, productImg: './assets/images/products/3.jpg', product:'Sofa Chiar', quantity: 1, unitPrice: '$40.63', subTotal: '$40.63'},
    {id: 4, productImg: './assets/images/products/4.jpg', product:'Table', quantity: 2, unitPrice: '$60.63', subTotal: '$60.63'},
    {id: 5, productImg: './assets/images/products/5.jpg', product:'Cup', quantity: 3, unitPrice: '$63,830.43', subTotal: '$45,530.43'},
]