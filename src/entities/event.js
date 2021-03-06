
export default class event {
    constructor(name, price, capacity, min_staff, start_date, end_date, description, staffs, revenue, stats) {
        this._name = name;
        this._price = price;
        this._capacity = capacity;
        this._min_staff = min_staff;
        this._sDate = start_date;
        this._eDate = end_date;
        this._descr = description;
        this._staffs = staffs;
        this._stats = stats;
        this._revenue = revenue;
    }

    get stats() {
        return this._stats;
    }

    get name() {
        return this._name;
    }
    get price() {
        return this._price;
    }
    get capacity() {
        return this._capacity
    }
    get min_staff() {
        return this._min_staff;
    }
    get start_date() {
        return this._sDate;
    }
    get end_date() {
        return this._eDate;
    }
    get description() {
        return this._descr;
    }
    set description(val) {
        this._descr = val;
    }
    get staffs() {
        return this._staffs;
    }
}
