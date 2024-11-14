package com.totalfitx.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AuthController {

    @GetMapping("/loginSuccess")
    @ResponseBody
    public String loginSuccess() {
        return "Login successful!";
    }

    @GetMapping("/loginFailure")
    @ResponseBody
    public String loginFailure() {
        return "Login failed!";
    }
}
