package com.fitness.gym.repository;

import com.fitness.gym.model.Supplement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SupplementRepository extends JpaRepository<Supplement, Long> {
    List<Supplement> findByCategory(String category);
    List<Supplement> findByIsAvailableTrue();
}
