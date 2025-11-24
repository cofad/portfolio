package dev.will.warner.portfolio.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") 
            .allowedOrigins("http://localhost:5500", "https://will-warner.dev")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            // .allowedHeaders("*")
            // .allowCredentials(true) // Allow credentials (e.g., cookies, authorization headers)
            .maxAge(3600); // Pre-flight cache duration (in seconds)
    }
}