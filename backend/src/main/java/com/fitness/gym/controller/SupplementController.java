package com.fitness.gym.controller;

import com.fitness.gym.model.Supplement;
import com.fitness.gym.service.SupplementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/supplements")
@CrossOrigin(origins = "http://localhost:3000")
public class SupplementController {

    @Autowired
    private SupplementService supplementService;

    @GetMapping
    public ResponseEntity<List<Supplement>> getAllSupplements() {
        return ResponseEntity.ok(supplementService.getAllSupplements());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Supplement>> getSupplementsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(supplementService.getSupplementsByCategory(category));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Supplement> getSupplementById(@PathVariable Long id) {
        return ResponseEntity.ok(supplementService.getSupplementById(id));
    }

    @PostMapping
    public ResponseEntity<Supplement> createSupplement(@RequestBody Supplement supplement) {
        return ResponseEntity.ok(supplementService.createSupplement(supplement));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Supplement> updateSupplement(@PathVariable Long id, @RequestBody Supplement supplement) {
        return ResponseEntity.ok(supplementService.updateSupplement(id, supplement));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSupplement(@PathVariable Long id) {
        supplementService.deleteSupplement(id);
        return ResponseEntity.ok().build();
    }
}
