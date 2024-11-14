package com.totalfitx.backend.test.utils;

import org.testcontainers.containers.PostgreSQLContainer;

public class TypedPostgreSQLContainer extends PostgreSQLContainer<TypedPostgreSQLContainer> {
    public TypedPostgreSQLContainer(String imageName) {
        super(imageName);
    }
}

