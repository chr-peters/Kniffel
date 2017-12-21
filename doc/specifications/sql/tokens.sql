create table tokens (
       name varchar(25) unique not null,
       foreign key(name) references users(name) on delete cascade,
       token varchar(120) not null
);
