import fs from "fs";
import { OrderList } from "../Models/orderlist.data";
import { Order } from "../Models/order.model";

export class OrderDbWrapper {
    private _orderList: OrderList;

    // Read seed data from data file, and store in in-memory list for further use.
    constructor() {
        let fileData = fs.readFileSync('src/Data/OrderData.json');
        this._orderList = JSON.parse(fileData.toString()) as OrderList;
    }

    // Returns the order information object based on passed parameter.
    public GetOrder = async (id: string) => {
        return this._orderList.orderList.find((order: Order) => {
            return order.id === id;
        })
    }

    public GetAllOrders = async (userName: string) => {
        return this._orderList.orderList.filter((order: Order) => {
            return order.userName === userName;
        })
    }

    // Add new order to orders list
    public Addorder = async (order: Order) => {
        this._orderList.orderList.push(order);
        return order;
    }

    // Delete given order from orders list
    public DeleteOrder = async (orderId: string) => {
        let _orderIndex = this._orderList.orderList.findIndex((order: Order) => {
            return order.id === orderId;
        });
        if(_orderIndex !== -1) {
            this._orderList.orderList.splice(_orderIndex, 1);
            return true;
        }
        return false;
    }

    public SetOrderSuccess = async (orderId: string) => {
        let _order = this._orderList.orderList.find((order: Order) => {
            return order.id === orderId;
        });
        if(_order) {
            _order.status = 'success';
            return _order;
        }
        return;
    }

    public SetOrderFail = async (orderId: string) => {
        let _order = this._orderList.orderList.find((order: Order) => {
            return order.id === orderId;
        });
        if(_order) {
            _order.status = 'failed';
            return _order;
        }
        return;
    }

    public SetDeliverySuccess = async (orderId: string) => {
        let _order = this._orderList.orderList.find((order: Order) => {
            return order.id === orderId;
        });
        if(_order) {
            _order.delivery = 'success';
            return _order;
        }
        return;
    }

    public SetDeliveryFailed = async (orderId: string) => {
        let _order = this._orderList.orderList.find((order: Order) => {
            return order.id === orderId;
        });
        if(_order) {
            _order.delivery = 'failed';
            return _order;
        }
        return;
    }
}