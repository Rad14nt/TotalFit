package com.totalfitx.backend.persistence;

import com.totalfitx.backend.model.WorkoutHasExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutHasExerciseRepository extends JpaRepository<WorkoutHasExercise, Long> {
}
