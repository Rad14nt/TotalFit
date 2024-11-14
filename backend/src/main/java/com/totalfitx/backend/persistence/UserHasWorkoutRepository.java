package com.totalfitx.backend.persistence;

import com.totalfitx.backend.model.UserHasWorkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserHasWorkoutRepository extends JpaRepository<UserHasWorkout, Long> {
}
