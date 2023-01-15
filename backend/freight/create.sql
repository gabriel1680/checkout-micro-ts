DROP IF EXISTS SCHEMA ccat9;
DROP IF EXISTS TABLE products;
DROP IF EXISTS TABLE coupons;

CREATE SCHEMA ccat9;
CREATE TABLE ccat9.products (
    id SERIAL PRIMARY KEY,
    description TEXT,
    price NUMERIC NOT NULL
);
CREATE TABLE ccat9.coupons (
    code VARCHAR(10) PRIMARY KEY,
    discount_percentage NUMERIC NOT NULL,
    expire_date TIMESTAMP NOT NULL
);

INSERT INTO ccat9.products (id, description, price) VALUES (1, 'A', 22), (2, 'B', 30), (3, 'C', 45);

INSERT INTO ccat9.coupons (code, discount_percentage, expire_date) VALUES ('VALE20', 20, '2024-12-12'), ('VALE60', 20, '2021-12-12');

CREATE TABLE cccat9.orders (
	id SERIAL PRIMARY KEY,
	coupon_code TEXT,
	coupon_percentage NUMERIC,
	code TEXT,
	cpf TEXT,
	email TEXT,
	issue_date TIMESTAMP,
	freight NUMERIC,
	total NUMERIC,
	sequence INTEGER
);

CREATE TABLE cccat9.items (
	order_id INTEGER REFERENCES cccat9.order (id),
	product_id INTEGER REFERENCES cccat9.product (id),
	price NUMERIC,
	quantity INTEGER,
	PRIMARY KEY (order_id, product_id)
);