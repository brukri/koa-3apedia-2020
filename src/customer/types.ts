export type Address = {
    street: string;
    streetNo: string;
    zip: number;
    city: string;
    country: string;
};

export type Customer = {
    id: string;
    firstName: string;
    lastName: string;
    address: Address;
};

export type CustomersMap = {
    [key: string]: Customer;
};
