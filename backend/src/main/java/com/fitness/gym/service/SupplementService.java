package com.fitness.gym.service;

import com.fitness.gym.model.Supplement;
import com.fitness.gym.repository.SupplementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplementService {

    @Autowired
    private SupplementRepository supplementRepository;

    public List<Supplement> getAllSupplements() {
        return supplementRepository.findByIsAvailableTrue();
    }

    public List<Supplement> getSupplementsByCategory(String category) {
        return supplementRepository.findByCategory(category);
    }

    public Supplement getSupplementById(Long id) {
        return supplementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplement not found"));
    }

    public Supplement createSupplement(Supplement supplement) {
        return supplementRepository.save(supplement);
    }

    public Supplement updateSupplement(Long id, Supplement supplementDetails) {
        Supplement supplement = getSupplementById(id);
        
        supplement.setName(supplementDetails.getName());
        supplement.setDescription(supplementDetails.getDescription());
        supplement.setPrice(supplementDetails.getPrice());
        supplement.setImageUrl(supplementDetails.getImageUrl());
        supplement.setCategory(supplementDetails.getCategory());
        supplement.setBrand(supplementDetails.getBrand());
        supplement.setStockQuantity(supplementDetails.getStockQuantity());
        supplement.setUsageInstructions(supplementDetails.getUsageInstructions());
        supplement.setBenefits(supplementDetails.getBenefits());
        supplement.setIsAvailable(supplementDetails.getIsAvailable());

        return supplementRepository.save(supplement);
    }

    public void deleteSupplement(Long id) {
        Supplement supplement = getSupplementById(id);
        supplement.setIsAvailable(false);
        supplementRepository.save(supplement);
    }
}
