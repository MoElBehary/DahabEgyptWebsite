export class ProductColor{
    prod_color: any; 
    prod_images: Array<object> ;
}
export class ProductSideImgs{
    prod_side_img: String;
}
export class Product{
    _id : any;
    prod_name : String;
    prod_desc : String;
    prod_category : String;
    prod_sub_category : String;
    prod_colors : Array<object>;
    price: { cost: Number, tag: String }
}
