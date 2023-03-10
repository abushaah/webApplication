/* FILE TABLE */
INSERT INTO FILE (file_name, file_title, file_description, creation_time, file_size) VALUES ('Emoji_Hearts.svg', 'Heart', 'Two Pink Hearts', CURRENT_TIMESTAMP, '12');
INSERT INTO FILE (file_name, file_title, file_description, creation_time, file_size) VALUES ('Emoji_Butterfly.svg', 'Blue Butterfly', null, CURRENT_TIMESTAMP, '26');
INSERT INTO FILE (file_name, file_title, file_description, creation_time, file_size) VALUES ('Emoji_Graduate.svg', null, 'Student Graduating', '2022-02-06 00:17:18', '34');
INSERT INTO FILE (file_name, file_title, file_description, creation_time, file_size) VALUES ('Emoji_Unicorn.svg', null, null, CURRENT_TIMESTAMP, '54');
INSERT INTO FILE (file_name, file_title, file_description, creation_time, file_size) VALUES ('Emoji_Happy.svg', null, 'A Smiling Emoji', '2021-04-06 00:17:18', '12');

/* MODIFICATION TABLE */
INSERT INTO MODIFICATION (mod_type, mod_summary, mod_date, svg_id) VALUES ('change attribute', 'change fill to blue for path 1', CURRENT_TIMESTAMP, (SELECT svg_id FROM FILE WHERE file_name='Emoji_Hearts.svg'));
INSERT INTO MODIFICATION (mod_type, mod_summary, mod_date, svg_id) VALUES ('add attribute', 'add circle at 2,8 with radius 6', CURRENT_TIMESTAMP, (SELECT svg_id FROM FILE WHERE file_name='Emoji_Butterfly.svg'));
INSERT INTO MODIFICATION (mod_type, mod_summary, mod_date, svg_id) VALUES ('change attribute', 'change fill to brown for path 2', '2022-02-07 00:17:18', (SELECT svg_id FROM FILE WHERE file_name='Emoji_Graduate.svg'));
INSERT INTO MODIFICATION (mod_type, mod_summary, mod_date, svg_id) VALUES ('add attribute', 'add square at 4,6 with width 6 height 4', '2022-03-06 00:17:18', (SELECT svg_id FROM FILE WHERE file_name='Emoji_Graduate.svg'));

/* DOWNLOAD TABLE */
INSERT INTO DOWNLOAD (d_time, d_hostname, svg_id) VALUES (CURRENT_TIMESTAMP, 'abushaah', (SELECT svg_id FROM FILE WHERE file_name='Emoji_Hearts.svg'));
INSERT INTO DOWNLOAD (d_time, d_hostname, svg_id) VALUES (CURRENT_TIMESTAMP, @@hostname, (SELECT svg_id FROM FILE WHERE file_name='Emoji_Butterfly.svg'));
INSERT INTO DOWNLOAD (d_time, d_hostname, svg_id) VALUES ('2022-02-07 00:17:18', @@hostname, (SELECT svg_id FROM FILE WHERE file_name='Emoji_Graduate.svg'));
INSERT INTO DOWNLOAD (d_time, d_hostname, svg_id) VALUES ('2023-01-01 00:17:18', @@hostname, (SELECT svg_id FROM FILE WHERE file_name='Emoji_Unicorn.svg'));
