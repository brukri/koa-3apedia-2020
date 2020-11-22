import InitialCustomers from './customers.json';
import { Address, Customer, CustomersMap } from './types';
import CustomerError from './customer-error';

const customers = InitialCustomers;

const checkCustomerExists: (id: string) => boolean = (id) => {
    return Boolean(customers[id]);
};

export const loadAllCustomers: () => CustomersMap = () => {
    return customers;
};

export const loadCustomersById: (id: string) => Customer = (id) => {
    return customers[id];
};

export const updateAddressByCustomerId: (id: string, address: Address) => void = (id, address) => {
    if (!checkCustomerExists(id)) {
        throw new CustomerError(`Customer with id=${id} does not exist`);
    }
    customers[id].address = address;
};

export const addCustomer: (customer: Customer) => void = (customer) => {
    const { id } = customer;

    if (checkCustomerExists(id)) {
        throw new CustomerError(`Customer with id=${id} does already exist`);
    }

    customers[id] = customer;
};
