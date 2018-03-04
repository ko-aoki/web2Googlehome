package com.example.web2googlehome.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/top")
public class SenderController {

    SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    public SenderController(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @GetMapping
    public String top(Model model) throws Exception {
        model.addAttribute("senderDto", new SenderDto());
        return "top";
    }

    @PostMapping(params = "send")
    public String send(SenderDto dto, Model model) throws Exception {
        model.addAttribute("senderDto", dto);
        this.simpMessagingTemplate.convertAndSend("/topic/notification", dto);
        return "top";
    }
}
