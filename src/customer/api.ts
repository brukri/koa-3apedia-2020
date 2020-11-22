import Router from 'koa-router';
import { Validation } from 'koa2-validation';
import { addCustomer, loadAllCustomers, loadCustomersById, updateAddressByCustomerId } from './service';
import Joi from '@hapi/joi';

const validator = new Validation(Joi);
const validate = validator.validate.bind(validator);

const router = new Router();

router.get('/', (ctx) => {
    const allCustomers = loadAllCustomers();
    ctx.body = allCustomers;
});

router.get('/:id', (ctx) => {
    const { params } = ctx;
    const customer = loadCustomersById(params.id);
    ctx.body = customer;
});

router.patch(
    '/:id/address',
    validate({
        body: {
            street: Joi.string().required(),
            streetNo: Joi.string().required(),
            zip: Joi.number().required(),
            city: Joi.string().required(),
            country: Joi.string().required(),
        },
    }),
    async (ctx) => {
        const { request, params } = ctx;
        const { body } = request;

        updateAddressByCustomerId(params.id, body);
        ctx.status = 200;
        ctx.body = {};
    }
);

router.put(
    '/',
    validate({
        body: {
            id: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            address: Joi.object({
                street: Joi.string().required(),
                streetNo: Joi.string().required(),
                zip: Joi.number().required(),
                city: Joi.string().required(),
                country: Joi.string().required(),
            }).required(),
        },
    }),
    async (ctx) => {
        const { request } = ctx;
        const { body } = request;

        addCustomer(body);
        ctx.status = 200;
        ctx.body = {};
    }
);

export default router;
