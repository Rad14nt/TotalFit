package com.totalfitx.backend.security;

import com.auth0.jwk.JwkProvider;
import com.auth0.jwk.JwkProviderBuilder;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j; // Add Lombok logging
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigInteger;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.KeyFactory;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.RSAPublicKeySpec;
import java.util.Base64;
import java.util.Collections;
import java.util.concurrent.TimeUnit;

import org.json.JSONArray;
import org.json.JSONObject;

@Slf4j // Enable Lombok logging
@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Value("${AWS_CLIENT_ID}")
    private String clientId;

    @Value("${AWS_USER_POOL_ID}")
    private String poolId;

    @Value("${AWS_REGION}")
    private String region;

    @Value("${AWS_JWK_URL}")
    private String jwkUrl;

    @Value("${AWS_ISSUER_URL}")
    private String issuerUrl;

    private JwkProvider provider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        log.debug("Entering JwtRequestFilter.doFilterInternal");

        final String authorizationHeader = request.getHeader("Authorization");

        log.debug("Authorization Header: {}", authorizationHeader);

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwtToken = authorizationHeader.substring(7);
            log.debug("Extracted JWT Token: {}", jwtToken);
            handleTokenValidation(jwtToken, request, response, chain);
        } else {
            log.debug("No JWT Token found in request headers");
            chain.doFilter(request, response);
        }
    }

    private void handleTokenValidation(String jwtToken, HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        try {
            DecodedJWT jwt = JWT.decode(jwtToken);
            log.debug("Decoded JWT: {}", jwt);

            RSAPublicKey publicKey = retrieveRsaPublicKey(jwt.getKeyId());
            if (publicKey == null) {
                log.error("Failed to retrieve JWK for token verification");
                response.sendError(HttpServletResponse.SC_FORBIDDEN, "Failed to retrieve JWK for token verification.");
                return;
            }

            Algorithm algorithm = Algorithm.RSA256(publicKey, null);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(issuerUrl)
                    .build();

            verifier.verify(jwtToken);
            log.debug("JWT Token verified successfully");
            setupSecurityContext(jwt, request);
            chain.doFilter(request, response);
        } catch (Exception e) {
            log.error("JWT verification failed: {}", e.getMessage(), e);
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "JWT verification failed: " + e.getMessage());
        }
    }

    private void setupSecurityContext(DecodedJWT jwt, HttpServletRequest request) {
        String cognitoUserId = jwt.getSubject();
        log.debug("Setting up security context for user: {}", cognitoUserId);
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(cognitoUserId, null, Collections.emptyList());
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        log.debug("Security context set with authentication: {}", authenticationToken);
    }

    private RSAPublicKey retrieveRsaPublicKey(String kid) {
        try {
            log.debug("Retrieving RSA public key for kid: {}", kid);
            if (provider == null) {
                log.debug("Initializing JwkProvider");
                provider = new JwkProviderBuilder(jwkUrl).cached(0, 0, TimeUnit.SECONDS).build();
            }

            JSONObject jwksJson = fetchJwkContent();
            return parsePublicKeyFromJwks(jwksJson, kid);

        } catch (Exception e) {
            log.error("Error retrieving RSA public key: {}", e.getMessage(), e);
            return null;
        }
    }

    private JSONObject fetchJwkContent() throws IOException {
        log.debug("Fetching JWK content from URL: {}", jwkUrl);
        HttpURLConnection connection = (HttpURLConnection) new URL(jwkUrl).openConnection();
        connection.setRequestMethod("GET");

        int responseCode = connection.getResponseCode();
        log.debug("JWK URL Response Code: {}", responseCode);

        if (responseCode != 200) {
            throw new IOException("Failed to fetch JWK content, response code: " + responseCode);
        }

        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        StringBuilder content = new StringBuilder();
        String inputLine;
        while ((inputLine = in.readLine()) != null) {
            content.append(inputLine);
        }
        in.close();
        connection.disconnect();
        log.debug("Fetched JWK content: {}", content.toString());
        return new JSONObject(content.toString());
    }

    private RSAPublicKey parsePublicKeyFromJwks(JSONObject jwksJson, String kid) throws Exception {
        JSONArray keys = jwksJson.getJSONArray("keys");
        log.debug("Parsing JWK keys");

        for (int i = 0; i < keys.length(); i++) {
            JSONObject key = keys.getJSONObject(i);
            log.debug("Inspecting key: {}", key);
            if (key.getString("kid").equals(kid)) {
                log.debug("Found matching key with kid: {}", kid);
                String modulusBase64 = key.getString("n");
                String exponentBase64 = key.getString("e");

                byte[] modulusBytes = Base64.getUrlDecoder().decode(modulusBase64);
                byte[] exponentBytes = Base64.getUrlDecoder().decode(exponentBase64);

                BigInteger modulus = new BigInteger(1, modulusBytes);
                BigInteger exponent = new BigInteger(1, exponentBytes);

                RSAPublicKeySpec keySpec = new RSAPublicKeySpec(modulus, exponent);
                KeyFactory keyFactory = KeyFactory.getInstance("RSA");
                RSAPublicKey publicKey = (RSAPublicKey) keyFactory.generatePublic(keySpec);
                log.debug("Successfully generated RSAPublicKey");
                return publicKey;
            }
        }
        log.error("No matching key found for kid: {}", kid);
        return null;
    }
}
