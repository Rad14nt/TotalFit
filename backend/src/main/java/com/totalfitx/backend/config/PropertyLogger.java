//package com.totalfitx.backend.config;
//
//import jakarta.annotation.PostConstruct;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//
//
//@Component
//public class PropertyLogger {
//
//    @Value("${SPRING_DATASOURCE_URL}")
//    private String datasourceUrl;
//
//    @Value("${SPRING_DATASOURCE_USERNAME}")
//    private String datasourceUsername;
//
//    @Value("${SPRING_DATASOURCE_PASSWORD}")
//    private String datasourcePassword;
//
//    @Value("${AWS_CLIENT_ID}")
//    private String clientId;
//
//    @Value("${AWS_USER_POOL_ID}")
//    private String userPoolId;
//
//    @Value("${AWS_REGION}")
//    private String region;
//
//
//    @PostConstruct
//    public void logProperties() {
//        System.out.println("hi there im andy");
//        System.out.println("Datasource URL: " + datasourceUrl);
//        System.out.println("Datasource Username: " + datasourceUsername);
//        System.out.println("Datasource Password: " + datasourcePassword);
//        System.out.println("AWS_USER_POOL_ID: " + userPoolId);
//        System.out.println("AWS_CLIENT_ID: " + clientId);
//        System.out.println("AWS_REGION: " + region);
//    }
//}
