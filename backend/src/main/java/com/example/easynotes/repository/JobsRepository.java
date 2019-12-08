package com.example.easynotes.repository;

import com.example.easynotes.model.Jobs;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobsRepository extends JpaRepository<Jobs, Long> {

}
