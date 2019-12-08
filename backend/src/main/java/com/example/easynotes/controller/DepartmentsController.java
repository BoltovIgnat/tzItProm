package com.example.easynotes.controller;

import com.example.easynotes.exception.ResourceNotFoundException;
import com.example.easynotes.model.Departments;
import com.example.easynotes.model.Jobs;
import com.example.easynotes.repository.DepartmentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/departments")
public class DepartmentsController {

    @Autowired
    DepartmentsRepository departmentsRepository;


    @GetMapping("/allforinput")
    @CrossOrigin
    public List<Departments> getAllDepartmentsForInput() {
        return departmentsRepository.findAll();
    }

    @GetMapping("/all")
    @CrossOrigin
    public String getAllJobs() {
        return convertWithIteration(departmentsRepository.findAll());
    }

    @RequestMapping(value="/editDepartments/{id}", method = RequestMethod.POST)
    @CrossOrigin
    public Departments updateNote(@PathVariable(value = "id") Integer DepartmentsId,
                           @RequestBody Departments noteDetails) {

        Departments departments = departmentsRepository.findById(DepartmentsId)
                .orElseThrow(() -> new ResourceNotFoundException("Departments", "id", DepartmentsId));

        departments.setName(noteDetails.getName());
        departments.setComment(noteDetails.getComment());

        Departments updatedNote = departmentsRepository.save(departments);
        return updatedNote;
    }

    @PostMapping("/createDepartments/")
    @CrossOrigin
    public Departments createOrders(@RequestBody Departments departments) {
        return departmentsRepository.save(departments);
    }

    @GetMapping("/deleteDepartments/{id}")
    @CrossOrigin
    public String deleteOrder(@PathVariable(value = "id") Integer DepartmentsId) {
        Departments departments = departmentsRepository.findById(DepartmentsId)
                .orElseThrow(() -> new ResourceNotFoundException("Departments", "id", DepartmentsId));

        departmentsRepository.delete(departments);

        return "Удалено";
    }

    public String convertWithIteration(List<Departments> map) {
        StringBuilder mapAsString = new StringBuilder("{");

        mapAsString.append("\"data\": ");
        mapAsString.append("[");

        for (Departments jobs : map) {
            mapAsString.append("{");

            mapAsString.append("\"id\": \" " + jobs.getId() + " \" , ");
            mapAsString.append("\"name\": \" " + jobs.getName() + " \" , ");
            mapAsString.append("\"comment\": \" " + jobs.getComment() + " \" , ");
            mapAsString.append("\"parent\": \" " + jobs.getParent() + " \" , ");
            mapAsString.append("\"buttons\": \" <a rowid='" + jobs.getId() +"' role='button' class='ibcbtn-edit btn btn-success' data-target='#editModal'>Редактировать</a> <a rowid='" + jobs.getId() +"' role='button' class='ibcbtn-delete btn btn-danger'>Удалить</a> \" ");
            mapAsString.append("},");
        }

        mapAsString.delete(mapAsString.length()-2, mapAsString.length()).append("}]}");
        return mapAsString.toString();
    }
}
