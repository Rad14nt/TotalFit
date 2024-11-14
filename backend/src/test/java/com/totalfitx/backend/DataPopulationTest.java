package com.totalfitx.backend;

import com.totalfitx.backend.model.Role;
import jakarta.persistence.EntityManagerFactory;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.List;

@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@SpringJUnitConfig
@DataJpaTest
@Slf4j
public class DataPopulationTest {

    @Autowired
    private EntityManagerFactory entityManagerFactory;

    @Autowired
    private DataSource dataSource;

    @Test
    void verifyDatabaseConnection() throws Exception {
        try (Connection connection = dataSource.getConnection()) {
            String dbName = connection.getCatalog();
            System.out.println("Connected to database: " + dbName);

            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT table_name FROM information_schema.tables WHERE table_schema='public';");

            System.out.println("Tables in the database:");
            while (rs.next()) {
                System.out.println(rs.getString(1));
            }
        }
    }

    @Test
    void populateRoles() {
        // Define standard roles
        var userRole = Role.builder()
                .name("USER")
                .build();

        var adminRole = Role.builder()
                .name("ADMIN")
                .build();

        var managerRole = Role.builder()
                .name("MANAGER")
                .build();

        // Persist roles into the database
        try (var em = entityManagerFactory.createEntityManager()) {
            em.getTransaction().begin();
            List.of(userRole, adminRole, managerRole).forEach(em::persist);
            em.getTransaction().commit();
        }
    }
}
