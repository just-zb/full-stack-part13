create table blogs(
                      id serial primary key,
                      author varchar(100),
                      url varchar(100) not null,
                      title text not null,
                      likes integer default 0
);
insert into blogs(author, url, title, likes) values
                                                 ('John Doe', 'https://example.com/blog1', 'My First Blog', 10),
                                                 ('Jane Smith', 'https://example.com/blog2', 'Learning SQL', 20),
                                                 ('Alice Johnson', 'https://example.com/blog3', 'Database Design', 15),
                                                 ('Bob Brown', 'https://example.com/blog4', 'Advanced SQL Queries', 25),
                                                 ('Charlie Green', 'https://example.com/blog5', 'SQL Performance Tuning', 30);