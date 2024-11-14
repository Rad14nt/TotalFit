package com.totalfitx.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.*;

@Data
@With
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "person_data")
public class PersonData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "person_id", nullable = false, unique = true)
    private Person person;

    @Column(name = "goal_type")
    private String goalType;

    @Column(name = "goal_weight", precision = 5, scale = 2)
    private BigDecimal goalWeight;

    @Column(name = "initial_weight", precision = 5, scale = 2)
    private BigDecimal initialWeight;

    @Column(name = "activity_level")
    private String activityLevel;

    private Integer age;

    @Column(name = "sex", length = 10)
    private String sex;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
