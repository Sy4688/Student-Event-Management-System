package com.example.student_service.controller;

import com.example.student_service.model.Student;
import com.example.student_service.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    private StudentService service;

    // POST: Register student
    @PostMapping("/register")
    public ResponseEntity<Student> register(@RequestBody Student student) {
        return new ResponseEntity<>(service.register(student), HttpStatus.CREATED);
    }

    // POST: Login — returns Student object so frontend can read rollNo
    @PostMapping("/login")
    public ResponseEntity<Student> login(@RequestBody Student loginRequest) {
        return service.login(loginRequest.getEmail(), loginRequest.getPassword())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    // GET: View student by roll number
    @GetMapping("/{rollNo}")
    public ResponseEntity<Student> getByRollNo(@PathVariable String rollNo) {
        return service.getByRollNo(rollNo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}