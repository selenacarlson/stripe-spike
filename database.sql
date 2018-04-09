CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    name character varying,
    email character varying,
    created Date,
    customer_id character varying
);

CREATE TABLE nonprofits
(
    id SERIAL PRIMARY KEY,
    name character varying,
    city character varying,
    state character varying,
    description character varying,
    product_id character varying,
    plan_id_five character varying,
    plan_id_ten character varying,
    plan_id_twenty character varying,
    created Date
);

