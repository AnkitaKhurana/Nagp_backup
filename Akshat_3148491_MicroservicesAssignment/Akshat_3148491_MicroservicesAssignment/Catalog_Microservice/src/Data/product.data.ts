import { ProductsList } from "../Models/productslist.model";
import fs from "fs";
import { Product } from "../Models/product.model";

export class CatalogDbWrapper {
    private _productsList: ProductsList;

    // Read seed data from data file, and store in in-memory list for further use.
    constructor() {
        let fileData = fs.readFileSync('src/Data/ProductsData.json');
        this._productsList = JSON.parse(fileData.toString()) as ProductsList;
    }

    public GetProduct = async (id: string) => {
        return this._productsList.productsList.find((product: Product) => {
            return product.id === id;
        })
    }

    public GetAllProducts = async () => {
        return this._productsList.productsList;
    }

    public AddProduct = async (product: Product) => {
        this._productsList.productsList.push(product);
        return product;
    }

    public DeleteProduct = async (productId: string) => {
        let _productIndex = this._productsList.productsList.findIndex((product: Product) => {
            return product.id === productId;
        });
        if(_productIndex !== -1) {
            this._productsList.productsList.splice(_productIndex, 1);
            return true;
        }
        return false;
    }

    public DecreaseProductInventory = async (productId: string, quantity: number) => {
        let _product = this._productsList.productsList.find((product: Product) => {
            return product.id === productId;
        });
        if(_product) {
            _product.quantity -= quantity;
            return _product;
        }
        return;
    }

    public IncreaseProductInventory = async (productId: string, quantity: number) => {
        let _product = this._productsList.productsList.find((product: Product) => {
            return product.id === productId;
        });
        if(_product) {
            _product.quantity += quantity;
            return _product;
        }
        return;
    }
}