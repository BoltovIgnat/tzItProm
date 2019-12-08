package com.example.easynotes.repository;

import com.example.easynotes.model.Employes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployesRepository extends JpaRepository<Employes, Long> {

}

