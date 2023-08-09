package com.oppas.batch;

import com.oppas.dto.PolicyApiDTO;
import com.oppas.service.PolicyService;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.xml.StaxEventItemReader;
import org.springframework.batch.item.xml.builder.StaxEventItemReaderBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.UrlResource;
import org.springframework.oxm.xstream.XStreamMarshaller;

import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.Map;

@Configuration
@RequiredArgsConstructor
public class PolicyJobConfig {

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final PolicyService policyService;

    @Bean
    public Job policyUpdateJob() {
        return jobBuilderFactory.get("policyUpdateJob")
                .incrementer(new RunIdIncrementer())
                .start(policyUpdateStep())
                .build();
    }

    @Bean
    public Step policyUpdateStep() {
        return stepBuilderFactory.get("policyUpdateStep")
                .<PolicyApiDTO, PolicyApiDTO>chunk(1)
                .reader(xmlItemReader(0))
                .writer(xmlItemWriter())
                .build();
    }

    @Bean
    @StepScope
    public StaxEventItemReader<PolicyApiDTO> xmlItemReader(@Value("#{jobParameters['pageIndex']}") long pageIndex) {
        System.out.println("Page Index: " + pageIndex);
        String apiUrl = "https://www.youthcenter.go.kr/opi/youthPlcyList.do?openApiVlak=839cda72655c1032eea8f071&display=100&pageIndex=" + pageIndex;

        // API URL에서 XML 데이터 읽어오기
        try {
            return new StaxEventItemReaderBuilder<PolicyApiDTO>()
                    .name("xmlItemReader")
                    .resource(new UrlResource(apiUrl))
                    .addFragmentRootElements("youthPolicy")
                    .unmarshaller(itemMarshaller())
                    .build();
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }

    }

    @Bean
    public ItemWriter<PolicyApiDTO> xmlItemWriter() {
        return items -> {
            for (PolicyApiDTO item : items) {
                Long policyId = policyService.updatePolicies(item);
                if (policyId != null) {
                    System.out.println("Saved policy ID: " + policyId);
                }
            }
        };
    }

    @Bean
    public XStreamMarshaller itemMarshaller() {
        Map<String, Class<?>> aliases = new HashMap<>();
        aliases.put("youthPolicy", PolicyApiDTO.class);

        XStreamMarshaller xStreamMarshaller = new XStreamMarshaller();
        xStreamMarshaller.setAliases(aliases);
        xStreamMarshaller.getXStream().allowTypes(new Class[]{PolicyApiDTO.class});

        return xStreamMarshaller;
    }

}