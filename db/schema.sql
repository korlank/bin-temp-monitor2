
DROP TABLE IF EXISTS sensors CASCADE;
CREATE TABLE sensors (
  reading_id SERIAL PRIMARY KEY NOT NULL,sensor_id INTEGER NOT NULL,
  reading_taken_on VARCHAR(255) NOT NULL,
  temperature INTEGER NOT NULL
);


INSERT INTO sensors (sensor_id, reading_taken_on, temperature) VALUES (1, 'Tue Mar 01 2022 02:48:56 GMT-0600 (Central Standard Time)', 25);

INSERT INTO sensors (sensor_id, reading_taken_on, temperature) VALUES (2, 'Tue Mar 01 2022 02:55:48 GMT-0600 (Central Standard Time)', 31);

INSERT INTO sensors (sensor_id, reading_taken_on, temperature) VALUES (3, 'Tue Mar 01 2022 02:56:03 GMT-0600 (Central Standard Time)', 42);