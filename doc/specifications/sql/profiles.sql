create table profiles (
       name varchar(25) unique not null,
       foreign key(name) references users(name) on delete cascade,
       info varchar(255) not null default ''
);
