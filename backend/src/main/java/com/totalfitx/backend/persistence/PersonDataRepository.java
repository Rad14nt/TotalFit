package com.totalfitx.backend.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import com.totalfitx.backend.model.PersonData;


public interface PersonDataRepository extends JpaRepository<PersonData, Long> {
}
