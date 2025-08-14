package com.fitness.gym.controller;

import com.fitness.gym.dto.CartRequest;
import com.fitness.gym.dto.ProductRequest;
import com.fitness.gym.dto.StripeResponse;
import com.fitness.gym.service.StripeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product/v1")
public class StripeController {

    private final StripeService stripeService;

    public StripeController(StripeService stripeService){
        this.stripeService = stripeService;
    }

    @PostMapping("checkout")
    public ResponseEntity<StripeResponse> checkoutProducts(@RequestBody ProductRequest productRequest){
        StripeResponse stripeResponse = stripeService.checkoutProducts(productRequest);

        if ("Failed".equalsIgnoreCase(stripeResponse.getStatus())) {
            // Return 500 for failure
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(stripeResponse);
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(stripeResponse);
    }
    @PostMapping("checkoutCart")
    public ResponseEntity<StripeResponse> checkoutCart(@RequestBody CartRequest cartRequest){
        StripeResponse stripeResponse = stripeService.checkoutCart(cartRequest);

        if ("Failed".equalsIgnoreCase(stripeResponse.getStatus())) {
            // Return 500 for failure
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(stripeResponse);
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(stripeResponse);
    }
    @GetMapping("/success")
    public String success() {
        return "Payment succeeded! Thank you for your purchase.";
    }
}
