package com.example.easynotes.controller;


import com.example.easynotes.exception.ResourceNotFoundException;
import com.example.easynotes.model.Employes;
import com.example.easynotes.repository.EmployesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/")
public class IndexController {

    @Autowired
    EmployesRepository employesRepository;


    @GetMapping("/deleteEmployes/{id}")
    @CrossOrigin
    public String deleteEmployes(@PathVariable(value = "id") Integer employesId) {
        Employes order = employesRepository.findById(Long.valueOf(employesId))
                .orElseThrow(() -> new ResourceNotFoundException("Employes", "id", employesId));

        employesRepository.delete(order);

        return "Удалено";
    }

    @PostMapping("/createEmployes/")
    @CrossOrigin
    public Employes createOrders(@RequestBody Employes employes) {
        return employesRepository.save(employes);
    }

    @GetMapping
    @CrossOrigin
    public String sayHello() {

        return convertWithIteration(employesRepository.findAll());

    }

    @RequestMapping(value="/editEmployes/{id}", method = RequestMethod.POST)
    @CrossOrigin
    public Employes updateNote(@PathVariable(value = "id") Long employesId,
                               @RequestBody Employes noteDetails) {

        Employes employes =  employesRepository.findById(employesId)
                .orElseThrow(() -> new ResourceNotFoundException("Employes", "id", employesId));

        employes.setName(noteDetails.getName());
        employes.setJobs(noteDetails.getJobs());
        employes.setDepartments(noteDetails.getDepartments());
        employes.setComment(noteDetails.getComment());

        Employes updatedNote = employesRepository.save(employes);
        return updatedNote;
    }
    
    public String convertWithIteration(List<Employes> map) {
        StringBuilder mapAsString = new StringBuilder("{");

        mapAsString.append("\"data\": ");
        mapAsString.append("[");

        for (Employes employes : map) {
            mapAsString.append("{");

            mapAsString.append("\"id\": \" " + employes.getId() + " \" , ");
            mapAsString.append("\"name\": \" " + employes.getName() + " \" , ");
            mapAsString.append("\"jobs\": \" " + employes.getJobs() + " \" , ");
            mapAsString.append("\"departments\": \" " + employes.getDepartments().getName() + " \" , ");
            mapAsString.append("\"comment\": \" " + employes.getComment() + " \" , ");
            mapAsString.append("\"buttons\": \" <a rowid='" + employes.getId() +"' role='button' class='ibcbtn-edit btn btn-success' data-target='#editModal'>Редактировать</a> <a rowid='" + employes.getId() +"' role='button' class='ibcbtn-delete btn btn-danger'>Удалить</a> \" ");
            mapAsString.append("},");
        }

        mapAsString.delete(mapAsString.length()-2, mapAsString.length()).append("}]}");
        return mapAsString.toString();
    }
}