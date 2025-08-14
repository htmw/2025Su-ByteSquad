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
        List<ProductRequest> products = cartRequest.getProducts();

        List<SessionCreateParams.LineItem> lineItems = products.stream()
                .map(product -> SessionCreateParams.LineItem.builder()
                        .setPrice(product.getPriceId())
                        .setQuantity(product.getQuantity())
                        .build())
                .toList();

        SessionCreateParams sessionParams = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:8080/product/v1/success")
                .setCancelUrl("http://localhost:8080/product/v1/cancel")
                .addAllLineItem(lineItems)
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
        return StripeResponse.builder()
                .status("Success")
                .message("Payment session is created successfully")
                .sessionId(session.getId())
                .sessionUrl(session.getUrl())
                .build();
    }

}
