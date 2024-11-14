package com.totalfitx.backend.persistence;

import com.totalfitx.backend.model.PerformedWorkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PerformedWorkoutRepository extends JpaRepository<PerformedWorkout, Long> {
}
