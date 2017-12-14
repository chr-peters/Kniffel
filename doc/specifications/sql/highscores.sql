create table highscores (
       name varchar(25) unique not null,
       foreign key(name) references users(name) on delete cascade,
       score integer not null,
       time_stamp datetime default current_timestamp()
);
