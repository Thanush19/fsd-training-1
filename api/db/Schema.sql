--psql -h pg.neon.tech
CREATE TABLE emp (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    dept VARCHAR(255) NOT NULL,
    desg VARCHAR(255) NOT NULL,
    sal VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    addr VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT current_timestamp
);
alter table emp add created_At timestamp default  current_timestamp