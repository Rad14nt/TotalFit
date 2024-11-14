-- Flyway Migration Script for PostgreSQL

-- -----------------------------------------------------
-- Table `person`
-- -----------------------------------------------------
CREATE TABLE person (
                        id SERIAL PRIMARY KEY,
                        first_name VARCHAR(45),
                        last_name VARCHAR(45),
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- Table `role`
-- -----------------------------------------------------
CREATE TABLE role (
                      id SERIAL PRIMARY KEY,
                      name VARCHAR(45) NOT NULL,
                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
CREATE TABLE "user" (
                        id SERIAL PRIMARY KEY,
                        email VARCHAR(255) NOT NULL,
                        username VARCHAR(255) NOT NULL,
                        aws_cognito_sub VARCHAR(255) NOT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        role_id INT NOT NULL,
                        person_id INT NOT NULL,
                        UNIQUE (email),
                        UNIQUE (username),
                        UNIQUE (aws_cognito_sub),
                        CONSTRAINT fk_user_person
                            FOREIGN KEY (person_id)
                                REFERENCES person (id)
                                ON DELETE CASCADE,
                        CONSTRAINT fk_user_role
                            FOREIGN KEY (role_id)
                                REFERENCES role (id)
                                ON DELETE NO ACTION
                                ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table `person_data`
-- -----------------------------------------------------
CREATE TABLE person_data (
                             id SERIAL PRIMARY KEY,
                             person_id INT NOT NULL,
                             goal_type VARCHAR(45),
                             goal_weight NUMERIC(5,2),
                             initial_weight NUMERIC(5,2),
                             activity_level VARCHAR(45),
                             age INT,
                             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             CONSTRAINT fk_person_data_person
                                 FOREIGN KEY (person_id)
                                     REFERENCES person (id)
                                     ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table `weight_log`
-- -----------------------------------------------------
CREATE TABLE weight_log (
                            id SERIAL PRIMARY KEY,
                            user_id INT NOT NULL,
                            date DATE NOT NULL,
                            weight NUMERIC(5,2) NOT NULL,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            UNIQUE (user_id, date),
                            CONSTRAINT fk_weight_log_user
                                FOREIGN KEY (user_id)
                                    REFERENCES "user" (id)
                                    ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table `device`
-- -----------------------------------------------------
CREATE TABLE device (
                        id SERIAL PRIMARY KEY,
                        user_id INT NOT NULL,
                        type VARCHAR(45) NOT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        CONSTRAINT fk_device_user
                            FOREIGN KEY (user_id)
                                REFERENCES "user" (id)
                                ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table `activity`
-- -----------------------------------------------------
CREATE TABLE activity (
                          id SERIAL PRIMARY KEY,
                          user_id INT NOT NULL,
                          date DATE NOT NULL,
                          steps INT,
                          calories_burned INT,
                          total_workout_duration INT, -- Duration in seconds
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          UNIQUE (user_id, date),
                          CONSTRAINT fk_activity_user
                              FOREIGN KEY (user_id)
                                  REFERENCES "user" (id)
                                  ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table `exercise`
-- -----------------------------------------------------
CREATE TABLE exercise (
                          id SERIAL PRIMARY KEY,
                          name VARCHAR(100) NOT NULL,
                          description TEXT,
                          user_id INT,
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          CONSTRAINT fk_exercise_user
                              FOREIGN KEY (user_id)
                                  REFERENCES "user" (id)
                                  ON DELETE SET NULL
);

-- -----------------------------------------------------
-- Table `workout`
-- -----------------------------------------------------
CREATE TABLE workout (
                         id SERIAL PRIMARY KEY,
                         name VARCHAR(100) NOT NULL,
                         description TEXT,
                         user_id INT,
                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         CONSTRAINT fk_workout_user
                             FOREIGN KEY (user_id)
                                 REFERENCES "user" (id)
                                 ON DELETE SET NULL
);

-- -----------------------------------------------------
-- Table `workout_exercise`
-- -----------------------------------------------------
CREATE TABLE workout_exercise (
                                  workout_id INT NOT NULL,
                                  exercise_id INT NOT NULL,
                                  order_in_workout INT NOT NULL,
                                  PRIMARY KEY (workout_id, exercise_id),
                                  CONSTRAINT fk_workout_exercise_workout
                                      FOREIGN KEY (workout_id)
                                          REFERENCES workout (id)
                                          ON DELETE CASCADE,
                                  CONSTRAINT fk_workout_exercise_exercise
                                      FOREIGN KEY (exercise_id)
                                          REFERENCES exercise (id)
                                          ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table `performed_workout`
-- -----------------------------------------------------
CREATE TABLE performed_workout (
                                   id SERIAL PRIMARY KEY,
                                   user_id INT NOT NULL,
                                   workout_id INT NOT NULL,
                                   started_at TIMESTAMP NOT NULL,
                                   completed_at TIMESTAMP,
                                   duration INT, -- Duration in seconds
                                   calories_burned INT,
                                   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                   CONSTRAINT fk_performed_workout_user
                                       FOREIGN KEY (user_id)
                                           REFERENCES "user" (id)
                                           ON DELETE CASCADE,
                                   CONSTRAINT fk_performed_workout_workout
                                       FOREIGN KEY (workout_id)
                                           REFERENCES workout (id)
                                           ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table `performed_exercise`
-- -----------------------------------------------------
CREATE TABLE performed_exercise (
                                    id SERIAL PRIMARY KEY,
                                    performed_workout_id INT NOT NULL,
                                    exercise_id INT NOT NULL,
                                    order_in_workout INT NOT NULL,
                                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                    CONSTRAINT fk_performed_exercise_performed_workout
                                        FOREIGN KEY (performed_workout_id)
                                            REFERENCES performed_workout (id)
                                            ON DELETE CASCADE,
                                    CONSTRAINT fk_performed_exercise_exercise
                                        FOREIGN KEY (exercise_id)
                                            REFERENCES exercise (id)
                                            ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table `performed_set`
-- -----------------------------------------------------
CREATE TABLE performed_set (
                               id SERIAL PRIMARY KEY,
                               performed_exercise_id INT NOT NULL,
                               set_number INT NOT NULL,
                               repetitions INT,
                               weight NUMERIC(5,2),
                               duration INT, -- Duration in seconds
                               set_type VARCHAR(45), -- e.g., 'strength', 'cardio'
                               created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                               updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                               CONSTRAINT fk_performed_set_performed_exercise
                                   FOREIGN KEY (performed_exercise_id)
                                       REFERENCES performed_exercise (id)
                                       ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table `post`
-- -----------------------------------------------------
CREATE TABLE post (
                      id SERIAL PRIMARY KEY,
                      user_id INT NOT NULL,
                      name VARCHAR(100),
                      description TEXT,
                      view_count BIGINT DEFAULT 0,
                      like_count BIGINT DEFAULT 0,
                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                      CONSTRAINT fk_post_user
                          FOREIGN KEY (user_id)
                              REFERENCES "user" (id)
                              ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table `ingredient`
-- -----------------------------------------------------
CREATE TABLE ingredient (
                            id SERIAL PRIMARY KEY,
                            name VARCHAR(100) NOT NULL,
                            calories INT NOT NULL,
                            protein NUMERIC(5,2) NOT NULL,
                            carbs NUMERIC(5,2) NOT NULL,
                            fat NUMERIC(5,2) NOT NULL,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- Table `meal`
-- -----------------------------------------------------
CREATE TABLE meal (
                      id SERIAL PRIMARY KEY,
                      user_id INT NOT NULL,
                      name VARCHAR(100),
                      date DATE NOT NULL,
                      meal_time VARCHAR(10) CHECK (meal_time IN ('Breakfast', 'Lunch', 'Dinner', 'Snack')),
                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                      CONSTRAINT fk_meal_user
                          FOREIGN KEY (user_id)
                              REFERENCES "user" (id)
                              ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table `meal_ingredient`
-- -----------------------------------------------------
CREATE TABLE meal_ingredient (
                                 meal_id INT NOT NULL,
                                 ingredient_id INT NOT NULL,
                                 quantity NUMERIC(7,2) NOT NULL, -- Quantity in grams
                                 PRIMARY KEY (meal_id, ingredient_id),
                                 CONSTRAINT fk_meal_ingredient_meal
                                     FOREIGN KEY (meal_id)
                                         REFERENCES meal (id)
                                         ON DELETE CASCADE,
                                 CONSTRAINT fk_meal_ingredient_ingredient
                                     FOREIGN KEY (ingredient_id)
                                         REFERENCES ingredient (id)
                                         ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table `nutrition`
-- -----------------------------------------------------
CREATE TABLE nutrition (
                           id SERIAL PRIMARY KEY,
                           user_id INT NOT NULL,
                           date DATE NOT NULL,
                           calories INT NOT NULL,
                           protein NUMERIC(7,2) NOT NULL,
                           carbs NUMERIC(7,2) NOT NULL,
                           fat NUMERIC(7,2) NOT NULL,
                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           UNIQUE (user_id, date),
                           CONSTRAINT fk_nutrition_user
                               FOREIGN KEY (user_id)
                                   REFERENCES "user" (id)
                                   ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Function to auto-update the `updated_at` column
-- -----------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- -----------------------------------------------------
-- Triggers for updating `updated_at` column
-- -----------------------------------------------------
CREATE TRIGGER update_person_updated_at
    BEFORE UPDATE ON person
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_role_updated_at
    BEFORE UPDATE ON role
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_user_updated_at
    BEFORE UPDATE ON "user"
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_person_data_updated_at
    BEFORE UPDATE ON person_data
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_weight_log_updated_at
    BEFORE UPDATE ON weight_log
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_device_updated_at
    BEFORE UPDATE ON device
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_activity_updated_at
    BEFORE UPDATE ON activity
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_exercise_updated_at
    BEFORE UPDATE ON exercise
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_workout_updated_at
    BEFORE UPDATE ON workout
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_performed_workout_updated_at
    BEFORE UPDATE ON performed_workout
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_performed_exercise_updated_at
    BEFORE UPDATE ON performed_exercise
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_performed_set_updated_at
    BEFORE UPDATE ON performed_set
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_post_updated_at
    BEFORE UPDATE ON post
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_ingredient_updated_at
    BEFORE UPDATE ON ingredient
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_meal_updated_at
    BEFORE UPDATE ON meal
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_nutrition_updated_at
    BEFORE UPDATE ON nutrition
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
