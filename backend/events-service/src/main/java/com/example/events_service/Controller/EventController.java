package com.example.events_service.Controller;

import com.example.events_service.Model.Event;
import com.example.events_service.Service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService service;

    // POST: Faculty adds event record
    @PostMapping
    public ResponseEntity<Event> addEvent(
            @RequestBody Event event) {
        return new ResponseEntity<>(
                service.addEvent(event), HttpStatus.CREATED);
    }

    // GET: View events by month (format: YYYY-MM)
    @GetMapping("/month/{yearMonth}")
    public ResponseEntity<List<Event>> getByMonth(
            @PathVariable String yearMonth) {
        return ResponseEntity.ok(
                service.getEventsByMonth(yearMonth));
    }

    // GET: Student views own events by roll number
    @GetMapping("/student/{rollNo}")
    public ResponseEntity<List<Event>> getByRollNo(
            @PathVariable String rollNo) {
        return ResponseEntity.ok(
                service.getEventsByRollNo(rollNo));
    }

    // PUT: Faculty updates event (access control via facultyId)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateEvent(
            @PathVariable String id,
            @RequestParam String facultyId,
            @RequestBody Event updatedEvent) {
        Event result = service.updateEvent(
                id, facultyId, updatedEvent);
        if (result != null) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body("Access denied: you can only update"
                        + " your own records.");
    }

    // DELETE: Faculty deletes event (access control via facultyId)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEvent(
            @PathVariable String id,
            @RequestParam String facultyId) {
        boolean deleted = service.deleteEvent(id, facultyId);
        if (deleted) {
            return ResponseEntity.ok(
                    "Event deleted successfully.");
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body("Access denied: you can only delete"
                        + " your own records.");
    }
}