package com.example.nomatter.repository;

import com.example.nomatter.domain.Routine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoutineRepository extends JpaRepository<Routine, Long> {

    Optional<Routine> findByHubId(Long hubId);

    List<Routine> findAllByHubId(Long hubId);

}
