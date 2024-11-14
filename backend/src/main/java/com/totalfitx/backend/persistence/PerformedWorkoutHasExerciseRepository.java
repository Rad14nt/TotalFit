package com.totalfitx.backend.persistence;

import com.totalfitx.backend.model.PerformedWorkoutHasExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PerformedWorkoutHasExerciseRepository extends JpaRepository<PerformedWorkoutHasExercise, Long> {
}
