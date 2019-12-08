package com.example.easynotes.controller;

import com.example.easynotes.exception.ResourceNotFoundException;
import com.example.easynotes.model.Departments;
import com.example.easynotes.model.Jobs;
import com.example.easynotes.repository.JobsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/jobs")
public class JobsController {

    @Autowired
    JobsRepository jobsRepository;

    @GetMapping("/allforinput")
    @CrossOrigin
    public List<Jobs> getAllJobsForInput() {
        return jobsRepository.findAll();
    }

    @GetMapping("/all")
    @CrossOrigin
    public String getAllJobs() {
        return convertWithIteration(jobsRepository.findAll());
    }

    @RequestMapping(value="/editJob/{id}", method = RequestMethod.POST)
    @CrossOrigin
    public Jobs updateNote(@PathVariable(value = "id") Integer JobId,
                                  @RequestBody Jobs noteDetails) {

        Jobs jobs = jobsRepository.findById(Long.valueOf(JobId))
                .orElseThrow(() -> new ResourceNotFoundException("Order", "id", JobId));

        jobs.setName(noteDetails.getName());
        jobs.setComment(noteDetails.getComment());

        Jobs updatedNote = jobsRepository.save(jobs);
        return updatedNote;
    }

    @PostMapping("/createJob/")
    @CrossOrigin
    public Jobs createOrders(@RequestBody Jobs jobs) {
        return jobsRepository.save(jobs);
    }

    @GetMapping("/deleteJob/{id}")
    @CrossOrigin
    public String deleteOrder(@PathVariable(value = "id") Integer JobId) {
        Jobs jobs = jobsRepository.findById(Long.valueOf(JobId))
                .orElseThrow(() -> new ResourceNotFoundException("Jobs", "id", JobId));

        jobsRepository.delete(jobs);

        return "Удалено";
    }

    public String convertWithIteration(List<Jobs> map) {
        StringBuilder mapAsString = new StringBuilder("{");

        mapAsString.append("\"data\": ");
        mapAsString.append("[");

        for (Jobs jobs : map) {
            mapAsString.append("{");

            mapAsString.append("\"id\": \" " + jobs.getId() + " \" , ");
            mapAsString.append("\"name\": \" " + jobs.getName() + " \" , ");
            mapAsString.append("\"nuberCar\": \" " + jobs.getComment() + " \" , ");
            mapAsString.append("\"buttons\": \" <a rowid='" + jobs.getId() +"' role='button' class='ibcbtn-edit btn btn-success' data-target='#editModal'>Редактировать</a> <a rowid='" + jobs.getId() +"' role='button' class='ibcbtn-delete btn btn-danger'>Удалить</a> \" ");
            mapAsString.append("},");
        }

        mapAsString.delete(mapAsString.length()-2, mapAsString.length()).append("}]}");
        return mapAsString.toString();
    }
}
