package com.oppas.batch;

import com.oppas.dto.PolicyDTO;
import com.oppas.service.PolicyService;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.xml.StaxEventItemReader;
import org.springframework.batch.item.xml.builder.StaxEventItemReaderBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.UrlResource;
import org.springframework.oxm.xstream.XStreamMarshaller;

import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.Map;

@Configuration
@RequiredArgsConstructor
public class XMLConfiguration {

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final PolicyService policyService;

    @Bean
    public Job xmlBatchJob() {
        return jobBuilderFactory.get("xmlBatchJob")
                .incrementer(new RunIdIncrementer())
                .start(xmlBatchStep(1))
                .build();
    }

    @Bean
    public Step xmlBatchStep(int pageIndex) {
        return stepBuilderFactory.get("xmlBatchStep" + pageIndex)
                .<PolicyDTO, PolicyDTO>chunk(10)
                .reader(xmlItemReader(pageIndex))
                .writer(xmlItemWriter())
                .build();
    }

    @Bean
//    @StepScope
    public StaxEventItemReader<PolicyDTO> xmlItemReader(int pageIndex) {
        // api url로 데이터 저장
        String url= "https://www.youthcenter.go.kr/opi/youthPlcyList.do?openApiVlak=839cda72655c1032eea8f071&display=100&pageIndex=" + String.valueOf(pageIndex);
        System.out.println(pageIndex);
        System.out.println(url);
        try {
            return new StaxEventItemReaderBuilder<PolicyDTO>()
                    .name("xmlItemReader")
                    .resource(new UrlResource(url))
                    .addFragmentRootElements("youthPolicy")
                    .unmarshaller(itemMarshaller())
                    .build();
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
    }

    @Bean
    public ItemWriter<PolicyDTO> xmlItemWriter() {
        return items -> {
            for (PolicyDTO item : items) {
                Long policyId = policyService.savePolicy(item);
                if (policyId != null) {
                    System.out.println("Saved policy ID: " + policyId);
                }
            }
        };
    }

    @Bean
    public XStreamMarshaller itemMarshaller() {
        Map<String, Class<?>> aliases = new HashMap<>();
        aliases.put("youthPolicy", PolicyDTO.class);

        XStreamMarshaller xStreamMarshaller = new XStreamMarshaller();
        xStreamMarshaller.setAliases(aliases);
        xStreamMarshaller.getXStream().allowTypes(new Class[]{PolicyDTO.class});

        return xStreamMarshaller;
    }

}