CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    email character varying,
    created Date,
    customer_id character varying
);
