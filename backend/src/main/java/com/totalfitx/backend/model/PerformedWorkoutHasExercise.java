package com.totalfitx.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.*;

@Data
@With
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "performed_workout_has_exercise")
public class PerformedWorkoutHasExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer repetitions;

    private Integer weight;

    private Integer duration;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "performed_workout_id", nullable = false)
    private PerformedWorkout performedWorkout;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
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

