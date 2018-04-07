CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    name character varying,
    email character varying,
    created Date,
    customer_id character varying
);

