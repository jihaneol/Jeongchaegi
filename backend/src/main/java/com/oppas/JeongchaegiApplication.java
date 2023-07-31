package com.oppas;

import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@EnableBatchProcessing
@SpringBootApplication
public class JeongchaegiApplication {

	public static void main(String[] args) {
		SpringApplication.run(JeongchaegiApplication.class, args);
	}

}
