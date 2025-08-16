package com.fitness.gym.service;

import com.fitness.gym.dto.CartRequest;
import com.fitness.gym.dto.ProductRequest;
import com.fitness.gym.dto.StripeResponse;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StripeService {
    @Value("${stripe.secretKey}")
    private String secretKey;

    public StripeResponse checkoutProducts(ProductRequest product) {
        Stripe.apiKey = secretKey;

        SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()
                .setPrice(product.getPriceId())
                .setQuantity(product.getQuantity())
                .build();

        SessionCreateParams sessionParams = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:8080/product/v1/success")
                .setCancelUrl("http://localhost:8080/product/v1/cancel")
                .addLineItem(lineItem)
                .build();

        Session session = null;
        try {
            session = Session.create(sessionParams);
        }
        catch (StripeException ex) {
            System.out.println("Stripe exception: " + ex.getMessage());
            return StripeResponse.builder()
                    .status("Failed")
                    .message("Failed to create payment session: " + ex.getMessage())
                    .build();
        }
        // Return successful response
        return StripeResponse.builder()
                .status("Success")
                .message("Payment session is created successfully")
                .sessionId(session.getId())
                .sessionUrl(session.getUrl())
                .build();
    }
    public StripeResponse checkoutCart(CartRequest cartRequest){
        Stripe.apiKey = secretKey;

        if (cartRequest == null || cartRequest.getProducts() == null || cartRequest.getProducts().isEmpty()) {
            return StripeResponse.builder().status("Failed").message("Cart is empty").build();
        }

        List<ProductRequest> products = cartRequest.getProducts();

        for (ProductRequest p : products) {
            if (p.getPriceId() == null || p.getPriceId().isBlank()) {
                return StripeResponse.builder().status("Failed").message("Missing price_id for one or more items").build();
            }
            if (p.getQuantity() == null || p.getQuantity() <= 0) {
                return StripeResponse.builder().status("Failed").message("Invalid quantity for one or more items").build();
            }
        }

        List<SessionCreateParams.LineItem> lineItems = products.stream()
                .map(p -> SessionCreateParams.LineItem.builder()
                        .setPrice(p.getPriceId())
                        .setQuantity(p.getQuantity())
                        .build())
                .toList();

        SessionCreateParams sessionParams = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:5173/success")
                .setCancelUrl("http://localhost:5173/cart")
                .addAllLineItem(lineItems)
                .build();

        try {
            Session session = Session.create(sessionParams);
            return StripeResponse.builder()
                    .status("Success")
                    .message("Payment session is created successfully")
                    .sessionId(session.getId())
                    .sessionUrl(session.getUrl())
                    .build();
        } catch (StripeException ex) {
            return StripeResponse.builder()
                    .status("Failed")
                    .message("Failed to create payment session: " + ex.getMessage())
                    .build();
        }
    }

}
